import { Router, type Router as ExpressRouter } from 'express'
import { authenticate } from '../middleware/authenticate'
import {
  createPayrollApplication,
  createSmeApplication,
  saveDraftApplication,
  uploadDocument,
  uploadDocumentFile,
  submitApplication,
  validateSmePayload,
  validatePayrollPayload,
  validateDraftPayload,
  validateDocumentPayload,
  validateDocumentTypeBody,
} from '../controllers/applications.controller'
import { uploadMiddleware } from '../config/upload'

const router: ExpressRouter = Router()

router.post('/applications/sme', authenticate, validateSmePayload, createSmeApplication)
router.post('/applications/payroll', authenticate, validatePayrollPayload, createPayrollApplication)
router.patch('/applications/:id/draft', authenticate, validateDraftPayload, saveDraftApplication)
router.post('/applications/:id/documents', authenticate, validateDocumentPayload, uploadDocument)
router.post('/applications/:id/documents/upload', authenticate, uploadMiddleware.single('file'), validateDocumentTypeBody, uploadDocumentFile)
router.patch('/applications/:id/submit', authenticate, submitApplication)
router.get('/applications/_ping', (_req, res) => res.json({ ok: true }))

export default router
