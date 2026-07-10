import supabase from  '../config/supabase.js';

async function getMovies(req, res){
    const { data, error} = await supabase
        .from('movies')
        .select('*')
    
    if(error){
        throw new Error(error.message)
    }

    return data
}

export default getMovies;