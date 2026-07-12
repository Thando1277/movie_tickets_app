import express from 'express';
const router = express.Router();

import {
        getAllMovies,
        getMovieById,
        getAvailableSeats,
        searchMovie
    } from '../controllers/movies.controller.js';

import authenticateToken from '../middleware/auth.middleware.js'

router.get('/movies', authenticateToken, getAllMovies)
router.get('/movies/search', authenticateToken, searchMovie)
router.get('/movies/:id', authenticateToken, getMovieById)
router.get('/seats/available', authenticateToken, getAvailableSeats)



export default router;