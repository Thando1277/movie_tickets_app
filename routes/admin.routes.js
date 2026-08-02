import express from 'express'
const router = express.Router();

import { getAdmins } from '../controllers/admin.controller.js';
import authenticateToken from '../middleware/auth.middleware.js';

router.get('/allAdmins', authenticateToken, getAdmins)

export default router;