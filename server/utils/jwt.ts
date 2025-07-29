import jwt from 'jsonwebtoken'
const runtimeConfig = useRuntimeConfig()

const JWT_SECRET = runtimeConfig.jwtSecret // 建议放在 .env 文件中

interface JwtPayload {
  userId: string
  username: string
  // 可以扩展更多字段
}

/**
 * 生成 token
 */
export function signToken(payload: JwtPayload, expiresIn = '2h' as const): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

/**
 * 验证 token
 */
export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload
}
