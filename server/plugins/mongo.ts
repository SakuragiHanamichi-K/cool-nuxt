import mongoose, { Schema, Model, Connection } from 'mongoose'
const runtimeConfig = useRuntimeConfig()
const connections = new Map<string, mongoose.Connection>()

function getConnection(dbName: string) {
  console.log(`🟡 [MongoDB] Connecting to ${dbName}...`)
  // 如果已经存在连接，则直接返回
  if (connections.has(dbName)) return connections.get(dbName)!
  const uri = `${runtimeConfig.mongoUri}${dbName}${runtimeConfig.mongoUriSuffix}`
  const conn = mongoose.createConnection(uri)
  conn.on('connected', () => console.log(`🟢 [MongoDB] Connected to ${dbName}`))
  conn.on('error', err => console.error(`🔴 [MongoDB] Error in ${dbName}:`, err))
  conn.on('disconnected', () => console.warn(`🟠 [MongoDB] Disconnected from ${dbName}`))
  connections.set(dbName, conn)
  return conn
}
// 模型缓存池（可按数据库分离）
const modelCache: Record<string, Model<any>> = {}

function getModel<T = any>(dbName: string, modelKey: string, schema: Schema, suffix?: string): mongoose.Model<T> {
  // dbName: 数据库名
  // modelKey: 模型key
  // 手动拼接模型名为了规范化模型名命名并减少模型名重复问题
  const modelName = `${dbName}_${modelKey}${suffix ? `_${suffix}` : ''}` // 模型唯一命名
  if (modelCache[modelName]) {
    return modelCache[modelName]
  }
  // 假设你有方法获取数据库连接
  const conn: Connection = getConnection(dbName)
  const model = conn.models[modelName] || conn.model<T>(modelName, schema)
  modelCache[modelName] = model
  return model
}

export default defineNitroPlugin(nitroApp => {
  nitroApp.mongo = {
    getConnection,
    getModel,
  }
})
