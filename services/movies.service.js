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

export async function findMovieByName(movie_name){
    const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('movie_name', movie_name)
        .maybeSingle()
    
    if(error){
        throw new Error(error.message)
    }

    return data;
}

export async function addBooking(full_name, movie_to_watch, seat_number){
    const { data, error } = await supabase
        .from('bookings')
        .insert([
            {
                booker_name: full_name,
                movie_to_watch: movie_to_watch,
                seat_number: seat_number,
            }
        ])
}

export async function changeSeatStatusToTaken(seat_number){
    const { data, error } = await supabase
        .from('seats')
        .update({ status: "Taken"})
        .eq('seat_number', seat_number)
        .select();
    
    if(error){
        throw new Error(error.message)
    }
}