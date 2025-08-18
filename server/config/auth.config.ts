export const authConfig = {
  tokenCookie: 'token',
  tokenHeader: 'Authorization',
  tokenPrefix: 'Bearer ',
  tokenExpiresIn: 60 * 60 * 24, // 秒，1 天
  refreshTokenExpiresIn: 60 * 60 * 24 * 7, // 7 天
}
