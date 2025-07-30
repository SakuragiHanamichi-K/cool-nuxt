import { signToken } from '~~/server/utils/jwt'
import UserSchema from '~~/server/models/User'
import bcrypt from 'bcryptjs'
import { AUTH_TOKEN, TOKEN_PREFIXES } from '~~/server/utils/constant'
const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username, password } = body
  const mongo = useNitroApp().mongo
  const UserModel = mongo.getModel(runtimeConfig.mongoTableName, 'User', UserSchema)
  const user = await UserModel.findOne({ username })
  if (!user) {
    return event.node.res.fail(CodeMap.NOT_FOUND, '用户不存在!')
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return event.node.res.fail(CodeMap.FORBIDDEN, '密码错误!')
  }

  const token = signToken({ userId: user._id, username: user.username })
  setHeader(event, AUTH_TOKEN, `${TOKEN_PREFIXES}${token}`)
  return event.node.res.success(CodeMap.SUCCESS, '登录成功!', user)
})
