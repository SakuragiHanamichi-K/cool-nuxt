/**
 * 生成全局唯一编号
 * @param {string} prefix 前缀，比如 'ORD' 或 'PROD'
 * @returns {string} 订单号
 */
export function generateCode(prefix = 'cool') {
  const date = new Date()

  // 年月日
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, '') // YYYYMMDD

  // 时间戳后5位（毫秒级别）
  const timePart = Date.now().toString().slice(-5)

  // 3位随机数
  const randomPart = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0')

  return `${prefix}${ymd}${timePart}${randomPart}`
}
