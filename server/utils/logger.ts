// server/utils/logger.ts
import pino, { multistream } from 'pino'
import path from 'path'
import fs from 'fs'

// 确保日志目录存在
const logDir = path.resolve(process.cwd(), 'logs')
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true })

const logPath = path.join(logDir, 'app.log')
const streams = [
  /* 终端中是否显示日志 */
  //   {
  //     level: 'info', // 必须要有 level
  //     stream: pino.transport({
  //       target: 'pino-pretty',
  //       options: { colorize: true },
  //     }),
  //   },
  /* 是否写入日志文件 */
  {
    level: 'info',
    stream: pino.destination({ dest: logPath, sync: true }),
  },
]
// 创建 pino logger，同步写入文件
export const logger = pino({ level: 'info', timestamp: pino.stdTimeFunctions.isoTime }, multistream(streams))
