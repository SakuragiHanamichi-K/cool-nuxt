import { signToken } from '~~/server/utils/jwt'
import { authConfig } from '~~/server/config/auth.config'
import { UserMongooseSchema } from '~~/server/models/User'
import bcrypt from 'bcryptjs'
const runtimeConfig = useRuntimeConfig()
import { StatusCodeMap } from '~~/server/config/code.config'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username, password } = body
  if (!username || !password) {
    return event.context.fail(StatusCodeMap.PARAM_ERROR, '用户名和密码不能为空!')
  }

  const mongo = useNitroApp().mongo
  const UserModel = mongo.getModel(runtimeConfig.mongoTableName, 'User', UserMongooseSchema)
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
  setHeader(event, authConfig.tokenHeader, `${authConfig.tokenPrefix}${token}`)
  setCookie(event, authConfig.tokenCookie, `${authConfig.tokenPrefix}${token}`, {
    httpOnly: true, // 建议设置，防止 XSS
    secure: true, // https 环境建议开启
    sameSite: 'lax', // 控制跨域
    maxAge: authConfig.refreshTokenExpiresIn,
  })
  return event.context.success(StatusCodeMap.SUCCESS, '登录成功!', user)
})
