import { Router, type Router as ExpressRouter } from 'express'

import authRoutes from './auth.routes'
import adminRoutes from './admin.routes'

const router: ExpressRouter = Router()

router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)

export default router
