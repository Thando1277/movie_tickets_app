import supabase from "../config/supabase.js";

export async function getAllAdmins() {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'admin')
        
    if(error){
        throw new Error(error.message)
    }

    return data;
}

export async function createMovie(movie_name, movie_picture, time, date){
    const { data, error} = await supabase
        .from('movies')
        .insert([
            {
                movie_name: movie_name,
                movie_picture: movie_picture,
                time: time,
                date: date
            }
        ])
        .select()
        .single()
    if(error){
        throw new Error(error.message)
    }

    return data;
}