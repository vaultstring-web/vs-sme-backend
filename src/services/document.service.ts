// services/document.service.ts
import { PrismaClient } from '../generated/prisma/client'
import fs from 'fs'
import path from 'path'
import { AppError } from '../utils/AppError'
import { logger } from '../config/logger'

const prisma = new PrismaClient()

interface Base64Document {
  base64: string
  fileName: string
  documentType: string
}

interface UploadedFile {
  fieldname: string
  originalname: string
  filename: string
  path: string
  size: number
}

interface DocumentTypes {
  [fieldName: string]: string
}

export class DocumentService {
  private static readonly DEFAULT_DOCUMENT_TYPES: DocumentTypes = {
    nationalIdFront: 'NATIONAL_ID_FRONT',
    nationalIdBack: 'NATIONAL_ID_BACK',
    profilePicture: 'PROFILE_PICTURE',
    proofOfAddress: 'PROOF_OF_ADDRESS',
    additionalDocuments: 'ADDITIONAL_DOCUMENT',
  }

  /**
   * Save base64 documents during registration
   */
  static async saveBase64Documents(
    userId: string, 
    documents: Base64Document[]
  ): Promise<any[]> {
    if (!documents || documents.length === 0) {
      return []
    }

    const savedDocuments = await Promise.all(
      documents.map(async (doc) => {
        await this.validateBase64Document(doc)
        const fileUrl = await this.saveBase64File(userId, doc)
        
        return prisma.userDocument.create({
          data: {
            userId,
            fileName: doc.fileName,
            fileUrl,
            documentType: doc.documentType,
          },
        })
      })
    )

    logger.info(`Saved ${savedDocuments.length} base64 documents for user ${userId}`)
    return savedDocuments
  }

  /**
   * Save uploaded files via multer
   */
  static async saveUploadedDocuments(
    userId: string,
    files: { [fieldname: string]: Express.Multer.File[] },
    customDocumentTypes?: DocumentTypes
  ): Promise<any[]> {
    if (!files || Object.keys(files).length === 0) {
      return []
    }

    const documentTypes = { ...this.DEFAULT_DOCUMENT_TYPES, ...customDocumentTypes }
    const uploadPromises: Promise<any>[] = []

    for (const [fieldName, fileArray] of Object.entries(files)) {
      for (const file of fileArray) {
        const documentType = documentTypes[fieldName] || fieldName
        
        uploadPromises.push(
          prisma.userDocument.create({
            data: {
              userId,
              fileName: file.originalname,
              fileUrl: `/uploads/${userId}/${file.filename}`,
              documentType,
            },
          })
        )
      }
    }

    const savedDocuments = await Promise.all(uploadPromises)
    logger.info(`Saved ${savedDocuments.length} uploaded documents for user ${userId}`)
    return savedDocuments
  }

  /**
   * Get user documents with pagination and filtering
   */
  static async getUserDocuments(
    userId: string,
    options: {
        page?: number
        limit?: number
        documentType?: string
        sortBy?: 'uploadedAt' | 'documentType'
        sortOrder?: 'asc' | 'desc'
    } = {}
    ): Promise<{ documents: any[]; total: number; page: number; totalPages: number }> {
    const {
        page = 1,
        limit = 20,
        documentType,
        sortBy = 'uploadedAt',
        sortOrder = 'desc',
    } = options

    const skip = (page - 1) * limit

    const where: any = { userId }
    if (documentType) {
        where.documentType = documentType
    }

    const [documents, total] = await Promise.all([
        prisma.userDocument.findMany({
        where,
        select: {
            id: true,
            fileName: true,
            fileUrl: true,
            documentType: true,
            uploadedAt: true,
            isVerified: true,
            verifiedAt: true,
            verifiedBy: true,
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        }),
        prisma.userDocument.count({ where }),
    ])

    return {
        documents,
        total,
        page,
        totalPages: Math.ceil(total / limit),
    }
    }

  /**
   * Get document by ID with validation
   */
  static async getDocumentById(documentId: string, userId?: string) {
    if (!documentId) {
        throw new AppError('Document ID is required', 400)
    }

    const where: any = { id: documentId }
    if (userId) {
        where.userId = userId // For user-specific document access
    }

    const document = await prisma.userDocument.findUnique({
        where,
        include: {
        user: {
            select: {
            id: true,
            email: true,
            fullName: true,
            },
        },
        },
    })

    if (!document) {
        throw new AppError('Document not found', 404)
    }

    return document
    }

  /**
   * Delete document by ID
   */
  static async deleteDocument(documentId: string, userId: string) {
    if (!documentId) {
        throw new AppError('Document ID is required', 400)
    }

    if (!userId) {
        throw new AppError('User ID is required', 400)
    }

    const document = await prisma.userDocument.findUnique({
        where: { id: documentId },
    })

    if (!document) {
        throw new AppError('Document not found', 404)
    }

    if (document.userId !== userId) {
        throw new AppError('You can only delete your own documents', 403)
    }

    // Delete file from storage
    if (document.fileUrl.startsWith('/uploads/')) {
        const filePath = path.join(process.cwd(), document.fileUrl)
        if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
        }
    }

    await prisma.userDocument.delete({
        where: { id: documentId },
    })

    logger.info(`Document ${documentId} deleted for user ${userId}`)
    return { success: true, message: 'Document deleted successfully' }
    }

  /**
   * Verify a document (admin function)
   */
  static async verifyDocument(documentId: string, adminId: string) {
    const document = await prisma.userDocument.findUnique({
      where: { id: documentId },
    })

    if (!document) {
      throw new AppError('Document not found', 404)
    }

    const updatedDocument = await prisma.userDocument.update({
      where: { id: documentId },
      data: {
        isVerified: true,
        verifiedAt: new Date(),
        verifiedBy: adminId,
      },
    })

    logger.info(`Document ${documentId} verified by admin ${adminId}`)
    return updatedDocument
  }

  /**
   * Get document statistics for a user
   */
  static async getDocumentStats(userId: string) {
    const stats = await prisma.userDocument.groupBy({
      by: ['documentType', 'isVerified'],
      where: { userId },
      _count: true,
    })

    const total = await prisma.userDocument.count({ where: { userId } })
    const verified = await prisma.userDocument.count({
      where: { userId, isVerified: true },
    })

    return {
      total,
      verified,
      pending: total - verified,
      byType: stats.reduce((acc, stat) => {
        if (!acc[stat.documentType]) {
          acc[stat.documentType] = { verified: 0, pending: 0 }
        }
        if (stat.isVerified) {
          acc[stat.documentType].verified += stat._count
        } else {
          acc[stat.documentType].pending += stat._count
        }
        return acc
      }, {} as Record<string, { verified: number; pending: number }>),
    }
  }

  /**
   * Private helper methods
   */
  private static async validateBase64Document(doc: Base64Document) {
    if (!doc.base64 || !doc.fileName || !doc.documentType) {
      throw new AppError(
        'Invalid document format. Each document needs base64, fileName, and documentType.',
        400
      )
    }

    // Validate base64 format
    if (!doc.base64.match(/^data:([A-Za-z-+\/]+);base64,/)) {
      throw new AppError('Invalid base64 format', 400)
    }
  }

  private static async saveBase64File(userId: string, doc: Base64Document): Promise<string> {
    const userDir = path.join('uploads', userId)
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true })
    }

    // Extract MIME type and base64 data
    const matches = doc.base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches) {
      throw new AppError('Invalid base64 data', 400)
    }

    const mimeType = matches[1]
    const base64Data = matches[2]
    const buffer = Buffer.from(base64Data, 'base64')

    // Validate file size (max 10MB)
    if (buffer.length > 10 * 1024 * 1024) {
      throw new AppError('File size exceeds 10MB limit', 400)
    }

    // Determine file extension from MIME type
    const ext = this.getExtensionFromMimeType(mimeType) || 
                doc.fileName.split('.').pop() || 
                'bin'
    
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${ext}`
    const filePath = path.join(userDir, uniqueFileName)

    // Save file
    fs.writeFileSync(filePath, buffer)

    return `/uploads/${userId}/${uniqueFileName}`
  }

  private static getExtensionFromMimeType(mimeType: string): string | null {
    const mimeToExt: Record<string, string> = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'application/pdf': 'pdf',
      'application/msword': 'doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    }

    return mimeToExt[mimeType] || null
  }
}