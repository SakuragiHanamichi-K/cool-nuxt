export function extractError(err: any) {
  const res = err?.response?._data
  return {
    code: res?.code,
    message: res?.message,
    data: res?.data,
  }
}
