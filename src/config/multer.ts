// src/config/multer.ts
import multer, { Multer } from 'multer'
import path from 'path'
import { Request, RequestHandler } from 'express'
import fs from 'fs'
import { AppError } from '../utils/AppError'

const uploadDir = 'uploads'

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    const userId = req.user?.id || 'temp'
    const userDir = path.join(uploadDir, userId)
    
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }
    cb(null, userDir)
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  },
})

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new AppError(`Invalid file type: ${file.mimetype}. Only images, PDFs, and Word docs are allowed.`, 400))
  }
}

// Create multer instance with explicit type
const upload: Multer = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10, // Max 10 files
  },
  fileFilter: fileFilter,
})

// Define interface for file fields
interface FileFields {
  nationalIdFront: Express.Multer.File[]
  nationalIdBack: Express.Multer.File[]
  profilePicture: Express.Multer.File[]
  proofOfAddress: Express.Multer.File[]
  additionalDocuments: Express.Multer.File[]
}

// Export specific upload configurations with explicit types
export const uploadUserDocuments: RequestHandler = upload.fields([
  { name: 'nationalIdFront', maxCount: 1 },
  { name: 'nationalIdBack', maxCount: 1 },
  { name: 'profilePicture', maxCount: 1 },
  { name: 'proofOfAddress', maxCount: 1 },
  { name: 'additionalDocuments', maxCount: 6 },
]) as RequestHandler

export const uploadSingle: RequestHandler = upload.single('document') as RequestHandler
export const uploadMultiple: RequestHandler = upload.array('documents', 10) as RequestHandler

// Helper type for typed request with files
export type TypedRequestWithFiles<
  T extends Record<string, any> = {},
  U extends Record<string, Express.Multer.File[]> = {}
> = Request & {
  body: T
  files?: U
  file?: Express.Multer.File
}

export default upload