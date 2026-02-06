import multer from 'multer'
import path from 'path'
import fs from 'fs'

const MAX_SIZE = Number(process.env.MAX_UPLOAD_SIZE_BYTES ?? 5 * 1024 * 1024)
const ALLOWED = (process.env.ALLOWED_UPLOAD_TYPES ?? 'application/pdf,image/png,image/jpeg')
  .split(',')
  .map(s => s.trim())

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function sanitizeBase(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_')
}

const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const appId = String(req.params.id || '')
    const dir = path.resolve('uploads', 'applications', appId)
    ensureDir(dir)
    cb(null, dir)
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    const base = sanitizeBase(path.basename(file.originalname, ext))
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${base}${ext}`
    cb(null, unique)
  },
})

function fileFilter(_req: any, file: Express.Multer.File, cb: (err: any, accept?: boolean) => void) {
  if (!ALLOWED.includes(file.mimetype)) {
    return cb(null, false)
  }
  cb(null, true)
}

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
})
