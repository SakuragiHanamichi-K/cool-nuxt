export default defineEventHandler(event => {
  event.node.res.success = (code = 200, msg = 'ok', data = null) => {
    event.node.res.setHeader('Content-Type', 'application/json')
    event.node.res.statusCode = code
    event.node.res.end(
      JSON.stringify({
        code,
        msg,
        data,
      }),
    )
  }

  event.node.res.fail = (code = 500, msg = '请求失败', data = null) => {
    event.node.res.setHeader('Content-Type', 'application/json')
    event.node.res.statusCode = code
    event.node.res.end(
      JSON.stringify({
        code,
        msg,
        data,
      }),
    )
  }
})
