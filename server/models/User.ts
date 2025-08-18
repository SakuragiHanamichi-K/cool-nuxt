import mongoose from 'mongoose'
import { z } from 'zod'

export const UserMongooseSchema = new mongoose.Schema(
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
    nickname: { type: String, default: '匿名用户' }, // 昵称，默认为空字符串
    avatar: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'users',
  },
)
export const UserZodSchema = z.object({
  username: z
    .string()
    .min(3, '用户名至少3个字符')
    // 必须英文开头
    .refine(val => /^[A-Za-z]/.test(val), {
      message: '用户名必须以英文开头',
    })
    // 只能包含字母和数字
    .refine(val => /^[A-Za-z0-9]+$/.test(val), {
      message: '用户名只能包含字母和数字',
    }),

  password: z
    .string()
    .min(6, '密码至少6位')
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, '密码必须包含英文和数字'),
  nickname: z.string().optional(), // 可以不传
  avatar: z.string().optional(), // 可以不传
})
export type UserType = z.infer<typeof UserZodSchema>
