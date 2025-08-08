import { verifyToken } from '~~/server/utils/jwt'
import { StatusCodeMap, HttpStatusMap } from '~~/server/utils/codeMap'
import { AUTH_TOKEN_COOKIE, TOKEN_PREFIXES } from '~~/server/utils/constant'
import { Response } from '~~/server/types/response'
// 白名单路径（支持正则前缀）
const WHITE_LIST: RegExp[] = [/^\/api\/public/]
// 判断路径是否在白名单中
function isInWhiteList(path: string): boolean {
  return WHITE_LIST.some(regex => regex.test(path))
}
// 封装统一响应结构
function formatResponse({ code, message, data }: Response): Response {
  return { code, message, data }
}
// 自动匹配 http 状态码
function resolveHttpStatus(code: number, customStatus?: number): number {
  return customStatus || HttpStatusMap[code] || 500
}

export default defineEventHandler(async event => {
  // 如果不是 API 路径，则直接返回
  if (!event.path.startsWith('/api')) return
  // 解析 body，赋值到 context
  if (['POST', 'PUT', 'PATCH'].includes(event.method)) {
    event.context.body = await readBody(event)
  }

  // Token 校验（非白名单）
  const pathname = getRequestURL(event).pathname
  if (!isInWhiteList(pathname)) {
    const rawToken = getCookie(event, AUTH_TOKEN_COOKIE)
    const token = rawToken ? rawToken.replace(TOKEN_PREFIXES, '') : null
    // 如果没有 token 返回未授权错误
    if (!token) {
      const status = resolveHttpStatus(StatusCodeMap.UNAUTHORIZED)
      setResponseStatus(event, status)
      return send(event, JSON.stringify(formatResponse({ code: StatusCodeMap.UNAUTHORIZED, message: '请先登录!' })), 'application/json')
    }
    // token 校验, 未通过的话返回登录失效
    let user
    try {
      user = verifyToken(token)
    } catch (err) {
      const status = resolveHttpStatus(StatusCodeMap.UNAUTHORIZED)
      setResponseStatus(event, status)
      return send(event, JSON.stringify(formatResponse({ code: StatusCodeMap.UNAUTHORIZED, message: '登录已失效，请重新登录!' })), 'application/json')
    }
    event.context.user = user
  }

  // ✅ 封装 success/fail 方法（挂载到 context）
  event.context.success = (code: number = StatusCodeMap.SUCCESS, message: string = '请求成功!', data: any = {}, httpStatus?: number) => {
    const status = resolveHttpStatus(code, httpStatus)
    setResponseStatus(event, status)
    return send(event, JSON.stringify(formatResponse({ code, message, data })), 'application/json')
  }

  event.context.fail = (code: number = StatusCodeMap.SERVER_ERROR, message: string = '请求失败!', data: any = null, httpStatus?: number) => {
    const status = resolveHttpStatus(code, httpStatus)
    setResponseStatus(event, status)
    return send(event, JSON.stringify(formatResponse({ code, message, data })), 'application/json')
  }
})
