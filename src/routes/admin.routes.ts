import { Router, type Router as ExpressRouter } from 'express'
import { authenticate } from '../middleware/authenticate'
import { requireRole } from '../middleware/requireRole'
import { listApplications, exportApplications, getAdminStats, listUsers } from '../controllers/admin.controller'
import {
  bulkUpdateApplicationStatus,
  updateApplicationData,
  updateApplicationStatus,
} from '../controllers/adminApplications.controller'

const router: ExpressRouter = Router()

// Protect all routes with authentication
router.use(authenticate)

// Admin-only dashboard or check
router.get('/dashboard', requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']), (req, res) => {
  res.json({
    message: 'Welcome to the admin dashboard',
    user: req.user,
  })
})

router.get('/applications', requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']), listApplications)
router.get('/applications/export', requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']), exportApplications)
router.patch('/applications/status/bulk', requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']), bulkUpdateApplicationStatus)
router.patch('/applications/:id/status', requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']), updateApplicationStatus)
router.patch('/applications/:id/data', requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']), updateApplicationData)
router.get('/stats', requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']), getAdminStats)
router.get('/users', requireRole(['ADMIN_TIER1', 'ADMIN_TIER2']), listUsers)

export default router
