import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true }, // 产品名称
    productCode: { type: String, required: false, unique: true }, // 产品编码，唯一标识
    owner: { type: String, required: true }, // 产品所有者
    description: { type: String, default: '' }, // 产品描述
    price: { type: Number, required: true }, // 产品价格
    stock: { type: Number, default: 0 }, // 产品库存
    category: { type: String, default: '' }, // 产品分类
    imageUrl: { type: String, default: '' }, // 产品图片URL
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: 'products',
  },
)

ProductSchema.pre('save', async function (next) {
  if (!this.productCode) {
    // 简单生成规则：C + 时间戳 + 3位随机数
    this.productCode = `C${Date.now()}${Math.floor(Math.random() * 1000)}`
    // 确保唯一性：查库，如果重复重新生成（不推荐递归，防止死循环）
    // const exists = await mongoose.model('Product').exists({ productCode: this.productCode })
    // if (exists) {
    //   this.productCode = `C${Date.now()}${Math.floor(Math.random() * 1000)}`
    // }
  }
  next()
})

export default ProductSchema

export type ProductType = {
  productName: string
  productCode: string
  owner: string
  description: string
  price: number
  stock: number
  category: string
  imageUrl: string
}
