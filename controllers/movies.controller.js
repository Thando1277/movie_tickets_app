import getMovies from '../data/movies.js';
import { 
    findMovieById,
    findAvailableSeats,
    searchMovieByName,
    addBooking,
    findMovieByName,
    changeSeatStatusToTaken
} from '../services/movies.service.js';

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

export async function bookMovie(req, res){
    try{
        const full_name = req.user.full_name;

        const { movie_to_watch, seat_number } = req.body;

        if(!movie_to_watch || !seat_number){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const movieInSystem = await findMovieByName(movie_to_watch)

        if(!movieInSystem){
            return res.status(400).json({
                message: "Movie not found"
            })
        }

        const availableSeats = await findAvailableSeats();

        const seatAvailable = availableSeats.some(seat => seat.seat_number === seat_number)

        if(!seatAvailable){
            return res.status(409).json({
                message: "Seat already taken"
            })
        }

        await addBooking(full_name, movie_to_watch, seat_number);

        await changeSeatStatusToTaken(seat_number);

        return res.status(200).json({
            message: "Movie Booked"
        })
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}