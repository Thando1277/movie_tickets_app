import express from 'express';
const router = express.Router();

import {register, login, getProfile} from '../controllers/auth.controller.js'
import authenticateToken from '../middleware/auth.middleware.js'

router.get('/me', authenticateToken, getProfile);
router.post('/register',register);
router.post('/login', login);

export default router;