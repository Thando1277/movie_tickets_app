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