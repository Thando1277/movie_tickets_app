import express from 'express'
const router = express.Router();

import { getAdmins, addNewMovie, removeMovie } from '../controllers/admin.controller.js';
import authenticateToken from '../middleware/auth.middleware.js';

router.get('/allAdmins', authenticateToken, getAdmins)
router.post('/addMovie', authenticateToken, addNewMovie)
router.delete('/deleteMovie', authenticateToken, removeMovie)

export default router;