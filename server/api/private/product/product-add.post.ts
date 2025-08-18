const runtimeConfig = useRuntimeConfig()
import { ProductMongooseSchema, ProductZodSchema } from '~~/server/models/Product'
import { StatusCodeMap } from '~~/server/config/code.config'
import { generateCode } from '~~/server/utils/tools'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { userId, username } = event.context.user
  const params = {
    ...body,
    ownerId: userId,
    ownerName: username,
    productCode: body.productCode || generateCode('p'), // 如果没有传递 productCode，则生成一个新的
  }
  const result = ProductZodSchema.safeParse(params)
  console.log('result', result)

  // 添加产品时，自动填充 ownerId 和 ownerName
  const mongo = useNitroApp().mongo
  const ProductModel = mongo.getModel(runtimeConfig.mongoTableName, 'Product', ProductMongooseSchema)
  // 先获取数据库中是否存在当前传递的产品编号,如果存在重新再生成一个编号
  const existingProduct = await ProductModel.findOne({ productCode: params.productCode })
  if (existingProduct) {
    params.productCode = generateCode('p')
  }
  // 创建产品
  const products = await ProductModel.create({ ...params })

  return event.context.success(StatusCodeMap.SUCCESS, '添加成功!', products)
})
