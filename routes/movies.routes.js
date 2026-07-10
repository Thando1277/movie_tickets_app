import express from 'express';
const router = express.Router();

import getAllMovies from '../controllers/movies.controller.js';
import authenticateToken from '../middleware/auth.middleware.js'

router.get('/movies', authenticateToken, getAllMovies)

export default router;