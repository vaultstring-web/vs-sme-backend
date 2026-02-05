import { Router, type Router as ExpressRouter } from 'express'

import authRoutes from './auth.routes'
import adminRoutes from './admin.routes'
import applicationsRoutes from './applications.routes'

const router: ExpressRouter = Router()

router.use('/auth', authRoutes)
router.use('/admin', adminRoutes)
router.use('/', applicationsRoutes)

export default router
