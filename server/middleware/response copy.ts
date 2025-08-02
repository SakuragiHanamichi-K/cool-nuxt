// server/middleware/global.ts
export default defineEventHandler(async event => {
  try {
    // 请求体处理（POST/PUT）
    await parseRequestBody(event)

    // 默认开启 token 验证
    const authRequired = event.context.authRequired !== false

    // 提取并校验 token
    const token = getCookie(event, 'token')
    if (authRequired) {
      if (!token) throw createError({ statusCode: 401, statusMessage: '请先登录' })
      event.context.token = token
      event.context.user = verifyToken(token)
    }

    // 响应封装：若接口未自行处理，则统一包裹
    const originalEnd = event.node.res.end.bind(event.node.res)
    event.node.res.end = function (...args) {
      if (event.context._isFormatted || event.context.bypassResponse) {
        return originalEnd(...args)
      }

      let body = args[0]
      let json: any = {}

      try {
        json = typeof body === 'string' ? JSON.parse(body) : body
      } catch (e) {
        json = { raw: body }
      }

      // 判断是否接口已自行设置 code/message
      const response = {
        code: json?.code ?? 0,
        message: json?.message ?? 'ok',
        data: json?.data ?? (json?.code || json?.message ? null : json),
      }

      event.context._isFormatted = true
      return originalEnd(JSON.stringify(response))
    }
  } catch (error: any) {
    return handleError(event, error)
  }
})

function verifyToken(token: string): any {
  // 这里建议改为实际 JWT 验证
  if (token === 'valid-token') {
    return { id: 1, name: '张三' }
  }
  throw createError({ statusCode: 401, statusMessage: '无效的 token' })
}

async function parseRequestBody(event: H3Event) {
  if (['POST', 'PUT', 'PATCH'].includes(event.method)) {
    const body = await readBody(event)
    event.context.body = body
  }
}

function handleError(event: H3Event, error: any) {
  const code = error.statusCode || 500
  const message = error.statusMessage || '服务器异常'

  console.error('[Server Error]', {
    url: getRequestURL(event).pathname,
    code,
    message,
    stack: error.stack,
  })

  event.node.res.statusCode = code
  event.context._isFormatted = true
  return {
    code,
    message,
    data: null,
  }
}
