// import type { ServerResponse } from 'http'

declare module 'http' {
  interface ServerResponse {
    success: (code?: number, msg?: string, data?: any) => void
    fail: (code?: number, msg?: string, data?: any) => void
  }
}
