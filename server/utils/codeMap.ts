/**
 * 企业级业务 code 与 HTTP 状态码映射配置
 */
export const StatusCodeMap = {
  SUCCESS: 20000,
  PARAM_ERROR: 40001,
  UNAUTHORIZED: 40101,
  FORBIDDEN: 40301,
  NOT_FOUND: 40401,
  SERVER_ERROR: 50000,
}

export const HttpStatusMap: Record<number, number> = {
  [StatusCodeMap.SUCCESS]: 200,
  [StatusCodeMap.PARAM_ERROR]: 400,
  [StatusCodeMap.UNAUTHORIZED]: 401,
  [StatusCodeMap.FORBIDDEN]: 403,
  [StatusCodeMap.NOT_FOUND]: 404,
  [StatusCodeMap.SERVER_ERROR]: 500,
}
