import { signToken } from '~~/server/utils/jwt'
import { UserMongooseSchema } from '~~/server/models/User'
import { StatusCodeMap } from '~~/server/config/code.config'
import bcrypt from 'bcryptjs'
import { authConfig } from '~~/server/config/auth.config'
const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username, password } = body
  const mongo = useNitroApp().mongo
  const UserModel = mongo.getModel(runtimeConfig.mongoTableName, 'User', UserMongooseSchema)
  let user = await UserModel.findOne({ username })
  if (!user) {
    const hashed = await bcrypt.hash(password, 10)
    user = await UserModel.create({ username, password: hashed })
    const token = signToken({ userId: user._id, username: user.username })
    setHeader(event, authConfig.tokenHeader, `${authConfig.tokenPrefix}${token}`)
    setCookie(event, authConfig.tokenCookie, `${authConfig.tokenPrefix}${token}`, {
      httpOnly: true, // 建议设置，防止 XSS
      secure: true, // https 环境建议开启
      sameSite: 'lax', // 控制跨域
      maxAge: authConfig.refreshTokenExpiresIn,
    })
    return event.context.success(StatusCodeMap.SUCCESS, '注册并登录成功!', user)
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return event.context.fail(StatusCodeMap.FORBIDDEN, '密码错误!')
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
