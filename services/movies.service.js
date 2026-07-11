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
