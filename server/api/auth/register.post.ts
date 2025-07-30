import { signToken } from '~~/server/utils/jwt'
import { AUTH_TOKEN, TOKEN_PREFIXES } from '~~/server/utils/constant'
import UserSchema from '~~/server/models/User'
import bcrypt from 'bcryptjs'
const runtimeConfig = useRuntimeConfig()

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username, password } = body
  if (!username || !password) {
    return event.node.res.fail(CodeMap.BAD_REQUEST, '用户名和密码不能为空!')
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
      return event.node.res.fail(CodeMap.FORBIDDEN, '密码错误!')
    }
    user = existingUser
  } else {
    const hashed = await bcrypt.hash(password, 10)
    user = await UserModel.create({ username, password: hashed })
  }
  const token = signToken({ userId: user._id, username: user.username })
  setHeader(event, AUTH_TOKEN, `${TOKEN_PREFIXES}${token}`)
  return event.node.res.success(CodeMap.SUCCESS, '登录成功!', user)
})
