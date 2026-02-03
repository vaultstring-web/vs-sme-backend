import { Router, type Router as ExpressRouter } from 'express'

import { authenticate } from '../middleware/authenticate'
import { confirmPasswordReset, login, logout, register, requestPasswordReset } from '../controllers/auth.controller'

const router: ExpressRouter = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authenticate, logout)

router.post('/password-reset/request', requestPasswordReset)
router.post('/password-reset/confirm', confirmPasswordReset)

export default router
