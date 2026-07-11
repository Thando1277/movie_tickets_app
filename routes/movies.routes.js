import express from 'express';
const router = express.Router();

import {getAllMovies} from '../controllers/movies.controller.js';
import {getMovieById} from '../controllers/movies.controller.js'
import authenticateToken from '../middleware/auth.middleware.js'

router.get('/movies', authenticateToken, getAllMovies)
router.get('/movies/:id', authenticateToken, getMovieById)

export default router;