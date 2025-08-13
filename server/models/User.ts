import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          // 正则解释：
          // ^[A-Za-z] → 开头必须是字母
          // [A-Za-z0-9]{2,} → 后面至少两个字符，只能是字母或数字
          return /^[A-Za-z][A-Za-z0-9]{2,}$/.test(v)
        },
        message: '用户名必须以英文开头，只能包含字母和数字，且至少3个字符',
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v: string) {
          // 必须包含至少一个英文字符和一个数字
          const hasLetter = /[A-Za-z]/.test(v)
          const hasNumber = /\d/.test(v)
          return hasLetter && hasNumber
        },
        message: '密码必须包含英文和数字',
      },
    }, // 存储加密后的密码
    nickname: { type: String },
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'users',
  },
)

export default UserSchema
