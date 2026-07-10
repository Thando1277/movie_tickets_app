import supabase from "../config/supabase.js";

async function getUsers() {
    const { data, error } = await supabase
        .from("users")
        .select("*");
}

getUsers();
