import { ProductMongooseSchema } from '~~/server/models/Product'
const runtimeConfig = useRuntimeConfig()
import { StatusCodeMap } from '~~/server/config/code.config'
import { generateCode } from '~~/server/utils/tools'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const mongo = useNitroApp().mongo
  const ProductModel = mongo.getModel(runtimeConfig.mongoTableName, 'Product', ProductMongooseSchema)
  // 先获取数据库中是否存在当前传递的产品编号,如果存在重新再生成一个编号
  const existingProduct = await ProductModel.findOne({ productCode: body.productCode })
  if (existingProduct) {
    body.productCode = generateCode('p')
  }
  // 创建产品
  const products = await ProductModel.create({ ...body })

  return event.context.success(StatusCodeMap.SUCCESS, '添加成功!', products)
})
