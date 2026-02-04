import express from 'express';
import { getUsers } from '../controllers/usersController';
import { authenticate, authorizeAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticate, authorizeAdmin, getUsers);

export default router;