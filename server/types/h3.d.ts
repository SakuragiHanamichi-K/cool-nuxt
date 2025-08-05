declare module 'h3' {
  interface H3EventContext {
    user?: any
    body?: any
    success?: (data: any, code?: number) => void
    fail?: (message?: string, code?: number) => void
  }
}
