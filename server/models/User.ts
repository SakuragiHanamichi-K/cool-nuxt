import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // 存储加密后的密码
    nickname: { type: String },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'users',
  },
)

export default UserSchema
