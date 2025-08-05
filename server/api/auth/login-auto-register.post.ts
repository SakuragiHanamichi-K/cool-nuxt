import { signToken } from '~~/server/utils/jwt'
import UserSchema from '~~/server/models/User'
import bcrypt from 'bcryptjs'
import { AUTH_TOKEN_COOKIE, AUTH_TOKEN_HEADER, TOKEN_PREFIXES, TOKEN_VALIDITY_PERIOD } from '~~/server/utils/constant'
const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username, password } = body
  const mongo = useNitroApp().mongo
  const UserModel = mongo.getModel(runtimeConfig.mongoTableName, 'User', UserSchema)
  let user = await UserModel.findOne({ username })
  if (!user) {
    const hashed = await bcrypt.hash(password, 10)
    user = await UserModel.create({ username, password: hashed })
    const token = signToken({ userId: user._id, username: user.username })
    setHeader(event, AUTH_TOKEN_HEADER, `${TOKEN_PREFIXES}${token}`)
    setCookie(event, AUTH_TOKEN_COOKIE, `${TOKEN_PREFIXES}${token}`, {
      httpOnly: true, // 建议设置，防止 XSS
      secure: true, // https 环境建议开启
      sameSite: 'lax', // 控制跨域
      maxAge: TOKEN_VALIDITY_PERIOD,
    })
    return event.context.success('注册并登录成功!', CodeMap.SUCCESS, user)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return event.context.fail('密码错误!', CodeMap.FORBIDDEN)
  }

  const token = signToken({ userId: user._id, username: user.username })
  setHeader(event, AUTH_TOKEN_HEADER, `${TOKEN_PREFIXES}${token}`)
  setCookie(event, AUTH_TOKEN_COOKIE, `${TOKEN_PREFIXES}${token}`, {
    httpOnly: true, // 建议设置，防止 XSS
    secure: true, // https 环境建议开启
    sameSite: 'lax', // 控制跨域
    maxAge: TOKEN_VALIDITY_PERIOD,
  })
  return event.context.success('登录成功!', CodeMap.SUCCESS, user)
})
