import UserSchema from '~~/server/models/User'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { username, password } = body
  const mongo = useNitroApp().mongo
  const UserModel = mongo.getModel('cool_nuxt_dev', 'User', UserSchema)
  const hashed = await bcrypt.hash(password, 10)
  const user = new UserModel({ username, password: hashed })
  await user.save()

  return event.node.res.success(CodeMap.SUCCESS, '注册成功!', user)
})
