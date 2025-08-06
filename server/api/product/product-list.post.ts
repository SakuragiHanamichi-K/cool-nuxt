import ProductSchema from '~~/server/models/Product'
const runtimeConfig = useRuntimeConfig()
import { StatusCodeMap } from '~~/server/utils/codeMap'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const mongo = useNitroApp().mongo
  const ProductModel = mongo.getModel(runtimeConfig.mongoTableName, 'Product', ProductSchema)
  const products = await ProductModel.find({ ...body })
  // if (!products) {
  //   return event.context.fail(StatusCodeMap.NOT_FOUND, '用户不存在!')
  // }
  return event.context.success(StatusCodeMap.SUCCESS, '查询成功!', products)
})
