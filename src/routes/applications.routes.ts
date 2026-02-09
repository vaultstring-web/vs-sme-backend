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
  listApplications,
  getApplicationById,
  deleteApplication,
} from '../controllers/applications.controller'
import { uploadMiddleware } from '../config/upload'

const router: ExpressRouter = Router()

// CREATE
router.post('/applications/sme', authenticate, validateSmePayload, createSmeApplication)
router.post('/applications/payroll', authenticate, validatePayrollPayload, createPayrollApplication)

// READ
router.get('/applications', authenticate, listApplications)
router.get('/applications/:id', authenticate, getApplicationById)

// UPDATE
router.patch('/applications/:id/draft', authenticate, validateDraftPayload, saveDraftApplication)
router.patch('/applications/:id', authenticate, validateDraftPayload, saveDraftApplication)

// DELETE
router.delete('/applications/:id', authenticate, deleteApplication)

// DOCUMENTS & SUBMIT
router.post('/applications/:id/documents', authenticate, validateDocumentPayload, uploadDocument)
router.post('/applications/:id/documents/upload', authenticate, uploadMiddleware.single('file'), validateDocumentTypeBody, uploadDocumentFile)
router.patch('/applications/:id/submit', authenticate, submitApplication)

// Health
router.get('/applications/_ping', (_req, res) => res.json({ ok: true }))

export default router