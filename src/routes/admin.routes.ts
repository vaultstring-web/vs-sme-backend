import { Router, type Router as ExpressRouter } from 'express'
import { authenticate } from '../middleware/authenticate'
import { requireRole } from '../middleware/requireRole'

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

export default router
