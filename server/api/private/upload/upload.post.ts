import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async event => {
  const uploadDir = path.join(process.cwd(), 'public/uploads')
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

  const form = formidable({
    multiples: true,
    uploadDir,
    keepExtensions: true,
  })

  return new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) return reject(err)

      const fileArr = Array.isArray(files.file) ? files.file : [files.file]
      const urls = fileArr.map(f => `/uploads/${path.basename((f as { filepath: string }).filepath)}`)

      resolve({ code: 0, message: '上传成功', urls })
    })
  })
})

export const config = {
  api: {
    bodyParser: false,
  },
}
