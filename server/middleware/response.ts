import { verifyToken } from '~~/server/utils/jwt'
import { CodeMap } from '~~/server/utils/codeMap'
import { AUTH_TOKEN_COOKIE, TOKEN_PREFIXES } from '~~/server/utils/constant'

// ✅ 白名单路径（支持正则前缀）
const WHITE_LIST: RegExp[] = [/^\/api\/login$/, /^\/api\/register$/, /^\/api\/public/, /^\/api\/auth\//]

// ✅ 判断路径是否在白名单中
function isInWhiteList(path: string): boolean {
  return WHITE_LIST.some(regex => regex.test(path))
}
type Response = {
  code: number
  message: string
  data?: any
}
// ✅ 封装统一响应结构
function formatResponse({ code, message, data }: Response): Response {
  return {
    code: code ?? CodeMap.SUCCESS,
    message: message ?? 'ok',
    data: data ?? null,
  }
}

export default defineEventHandler(async event => {
  // 如果不是 API 路径，则直接返回
  if (!event.path.startsWith('/api')) return
  try {
    // ✅ 解析 body，赋值到 context
    if (['POST', 'PUT', 'PATCH'].includes(event.method)) {
      event.context.body = await readBody(event)
    }

    // ✅ Token 校验（非白名单）
    const pathname = getRequestURL(event).pathname
    if (!isInWhiteList(pathname)) {
      const rawToken = getCookie(event, AUTH_TOKEN_COOKIE)
      const token = rawToken ? rawToken.replace(TOKEN_PREFIXES, '') : null
      if (!token) {
        throw createError({
          statusCode: CodeMap.UNAUTHORIZED,
          statusMessage: '请先登录',
        })
      }
      const user = verifyToken(token)
      event.context.user = user
    }

    // ✅ 封装 success/fail 方法（挂载到 context）
    event.context.success = (code: number = CodeMap.SUCCESS, message: string = '请求成功!', data: any = {}) => {
      return send(event, JSON.stringify(formatResponse({ code, message, data })), 'application/json')
    }

    event.context.fail = (code: number = CodeMap.SERVER_ERROR, message: string = '请求失败!', data: any = null) => {
      return send(event, JSON.stringify(formatResponse({ code, message, data })), 'application/json')
    }
  } catch (error: any) {
    return sendError(
      event,
      createError({
        statusCode: error.statusCode || CodeMap.SERVER_ERROR,
        statusMessage: error.statusMessage || '服务异常',
      }),
    )
  }
})
