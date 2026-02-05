import { Router, type Router as ExpressRouter } from 'express'
import { authenticate } from '../middleware/authenticate'
import {
  createPayrollApplication,
  createSmeApplication,
  saveDraftApplication,
  uploadDocument,
  submitApplication,
  validateSmePayload,
  validatePayrollPayload,
  validateDraftPayload,
  validateDocumentPayload,
} from '../controllers/applications.controller'

const router: ExpressRouter = Router()

router.post('/applications/sme', authenticate, validateSmePayload, createSmeApplication)
router.post('/applications/payroll', authenticate, validatePayrollPayload, createPayrollApplication)
router.patch('/applications/:id/draft', authenticate, validateDraftPayload, saveDraftApplication)
router.post('/applications/:id/documents', authenticate, validateDocumentPayload, uploadDocument)
router.patch('/applications/:id/submit', authenticate, submitApplication)
router.get('/applications/_ping', (_req, res) => res.json({ ok: true }))

export default router
