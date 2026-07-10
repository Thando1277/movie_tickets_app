import getMovies from '../data/movies.js';

async function getAllMovies(req, res){
    try{
        const movies = await getMovies();

        res.status(200).json(movies)

    }catch(error){
        return res.status(500).json({
            error: error.message
        })
    }
}
export default getAllMovies;