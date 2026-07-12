import getMovies from '../data/movies.js';
import { findMovieById, findAvailableSeats, searchMovieByName } from '../services/movies.service.js';

export async function getAllMovies(req, res){
    try{
        const movies = await getMovies();

        res.status(200).json(movies)

    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}

export async function getMovieById(req, res){
    const { id } = req.params;

    try{

        if(!id){
            return res.status(400).json({
                message: "ID required"
            })
        }

        const movie = await findMovieById(id);

        return res.status(200).json({
            movie
        })

    }catch(error){
        return res.status(404).json({
            error: 'Movie not found'
        })
    }
}

export async function getAvailableSeats(req, res){
    try{
        const seats = await findAvailableSeats();

        return res.status(200).json({seats})

    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}

export async function searchMovie(req, res){
    try{
        const { movie_name } = req.query;

        if(!movie_name){
            return res.status(400).json({
                message: "Movie name required"
            })
        }

        const movie = await searchMovieByName(movie_name);

        return res.status(200).json({movie})

    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}