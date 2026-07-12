import supabase from "../config/supabase.js";

export async function findMovieById(id){
    const { data: movie, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', id)
        .single()
        
    if(error){
        throw new Error(error.message)
    }

    return movie;
}

export async function findAvailableSeats(){
    const { data: seats, error } = await supabase
        .from('seats')
        .select('*')
        .eq('status', 'Available')
    
    if(error){
        throw new Error(error.message)
    }

    return seats
}

export async function searchMovieByName(movieName){
    const { data, error } = await supabase
        .from('movies')
        .select('*')
        .ilike('movie_name', `%${movieName}%`)
    
    if(error){
        throw new Error(error.message)
    }

    return data;
}