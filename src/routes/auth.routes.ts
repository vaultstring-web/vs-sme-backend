import { Router, type Router as ExpressRouter } from 'express'

import { authenticate } from '../middleware/authenticate'
import { uploadUserDocuments } from '../config/multer'
import { 
  requireAdmin, 
  requireAdminTier1, 
  requireAdminTier2 
} from '../middleware/authorize'

import {
  // Public endpoints
  register,
  login,
  logout,
  refreshToken,
  requestPasswordReset,
  confirmPasswordReset,
  uploadUserDocumentsEndpoint,
  getUserDocuments,
  
  // Admin endpoints
  adminRegister,
  listUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/auth.controller'

const router: ExpressRouter = Router()

// ========== PUBLIC ROUTES ==========
router.post('/register', register)
router.post('/login', login)
router.post('/refresh-token', refreshToken)
router.post('/password-reset/request', requestPasswordReset)
router.post('/password-reset/confirm', confirmPasswordReset)
router.post(
  '/users/me/documents', 
  authenticate, 
  uploadUserDocuments,
  uploadUserDocumentsEndpoint
)

router.get(
  '/users/me/documents', 
  authenticate, 
  getUserDocuments
)

// ========== PROTECTED ROUTES (Require Authentication) ==========
router.post('/logout', authenticate, logout)

// ========== ADMIN ROUTES ==========
// User management (Admin Tier 1+)
router.post('/admin/register', authenticate, requireAdminTier1, adminRegister)
router.get('/admin/users', authenticate, requireAdmin, listUsers)
router.get('/admin/users/:id', authenticate, requireAdmin, getUser)

// User updates (Admin Tier 1+ for basic updates, Tier 2 for role changes)
router.patch('/admin/users/:id', authenticate, requireAdminTier1, updateUser)

// User deletion (Admin Tier 2 only - more sensitive)
router.delete('/admin/users/:id', authenticate, requireAdminTier2, deleteUser)

router.get(
  '/users/:id/documents', 
  authenticate, 
  requireAdmin,
  getUserDocuments
)

export default router