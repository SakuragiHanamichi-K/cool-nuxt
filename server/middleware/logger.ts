import { logger } from '~~/server/utils/logger'

export default defineEventHandler(async event => {
  const start = Date.now()
  // 同步写入耗时日志
  const ms = Date.now() - start
  logger.info({
    method: event.node.req.method,
    url: event.node.req.url,
    status: event.node.res.statusCode || 200,
    time: `${ms}ms`,
  })
})
