import mongoose from 'mongoose'
import { generateCode } from '~~/server/utils/tools'
import { z } from 'zod'

export const ProductMongooseSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true }, // 产品名称
    productCode: { type: String, required: false, unique: true }, // 产品编码，唯一标识
    owner: { type: String, required: true }, // 产品所有者
    description: { type: String, default: '' }, // 产品描述
    price: { type: Number, required: true }, // 产品价格
    stock: { type: Number, default: 0 }, // 产品库存
    category: { type: String, default: '' }, // 产品分类
    imageUrl: { type: Array, default: [] }, // 产品图片URL
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'products',
  },
)

ProductMongooseSchema.pre('save', async function (next) {
  if (!this.productCode) {
    this.productCode = generateCode('p')
  }
  next()
})

export const ProductZodSchema = z.object({
  productName: z.string(),
  productCode: z.string(),
  owner: z.string(),
  description: z.string().optional(), // 可选字段
  price: z.number(),
  stock: z.number(),
  category: z.string(),
  imageUrl: z
    .array(z.instanceof(File)) // File 数组
    .nullable() // 可以为 null
    .optional(),
})
export type ProductType = z.infer<typeof ProductZodSchema>
