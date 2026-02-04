import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, getProfile);
router.patch('/', authenticate, updateProfile);

export default router;