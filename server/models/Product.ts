import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true }, // 产品名称
    productCode: { type: String, required: true, unique: true }, // 产品编码，唯一标识
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

export default UserSchema
