import { getAllAdmins } from "../services/admin.service.js";

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

