import mongoose from 'mongoose'
import { z } from 'zod'

export const ProductMongooseSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true }, // 产品名称
    productCode: { type: String, required: true, unique: true }, // 产品编码，唯一标识
    ownerId: { type: String, required: true }, // 产品所有者 id
    ownerName: { type: String, required: true }, // 产品所有者 name
    description: { type: String, default: '' }, // 产品描述
    price: { type: Number, required: true, default: 0 }, // 产品价格
    category: { type: String, required: true, default: '' }, // 产品分类
    imageUrl: { type: Array, required: true, default: [] }, // 产品图片URL
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'products',
  },
)

export const ProductZodSchema = z.object({
  productName: z.string(),
  productCode: z.string(),
  ownerId: z.string(),
  ownerName: z.string(),
  description: z.string().optional(), // 可选字段
  price: z.number(),
  category: z.string(),
  imageUrl: z.array(z.instanceof(File)), // File 数组
})
export type ProductType = z.infer<typeof ProductZodSchema>
