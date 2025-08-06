import { signToken } from '~~/server/utils/jwt'
import { AUTH_TOKEN_HEADER, AUTH_TOKEN_COOKIE, TOKEN_PREFIXES, TOKEN_VALIDITY_PERIOD } from '~~/server/utils/constant'
import UserSchema from '~~/server/models/User'
import bcrypt from 'bcryptjs'
const runtimeConfig = useRuntimeConfig()
import { StatusCodeMap } from '~~/server/utils/codeMap'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username, password } = body
  if (!username || !password) {
    return event.context.fail(StatusCodeMap.PARAM_ERROR, '用户名和密码不能为空!')
  }

  const mongo = useNitroApp().mongo
  const UserModel = mongo.getModel(runtimeConfig.mongoTableName, 'User', UserSchema)
  // 查找用户是否存在
  const existingUser = await UserModel.findOne({ username })
  let user
  if (existingUser) {
    // 已存在，验证密码
    const valid = await bcrypt.compare(password, existingUser.password)
    if (!valid) {
      return event.context.fail(StatusCodeMap.FORBIDDEN, '密码错误!')
    }
    user = existingUser
  } else {
    const hashed = await bcrypt.hash(password, 10)
    user = await UserModel.create({ username, password: hashed })
  }
  const token = signToken({ userId: user._id, username: user.username })
  setHeader(event, AUTH_TOKEN_HEADER, `${TOKEN_PREFIXES}${token}`)
  setCookie(event, AUTH_TOKEN_COOKIE, `${TOKEN_PREFIXES}${token}`, {
    httpOnly: true, // 建议设置，防止 XSS
    secure: true, // https 环境建议开启
    sameSite: 'lax', // 控制跨域
    maxAge: TOKEN_VALIDITY_PERIOD,
  })
  return event.context.success(StatusCodeMap.SUCCESS, '登录成功!', user)
})
