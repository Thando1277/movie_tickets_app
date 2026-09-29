import { getAllAdmins, createMovie } from "../services/admin.service.js";

export async function getAdmins(req, res){

    try{
        const user = req.user;

        if(user.role !== 'admin'){
            return res.status(403).json({
                message: "Only an admin can view admins"
            })
        }

        const admins = await getAllAdmins();

        if(admins.length === 0){
            return res.status(200).json({
                message: "No admins found"
            })
        }

        return res.status(200).json({ admins });

    }catch(error){
        console.log("Error fetching admins, ", error)
        return res.status().json({
            message: "Internal Server error"
        })
    }
}

export async function addNewMovie(req, res){
    try{
        const user = req.user;

        if(user.role !== 'admin'){
            return res.status(403).json({
                message: "Only an admin can add new movies"
            })
        }

        const { movie_name, movie_picture, time, date} = req.body;

        if(!movie_name || !movie_picture || !time || !date){
            return res.status(400).json({
                message: "Both movie_name and movie_picture are required"
            })
        }

        await createMovie(movie_name, movie_picture, time, date);

        return res.status(201).json({
            message: "New movie successfully added"
        })

    }catch(error){
        console.log("Error adding movies, ", error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}