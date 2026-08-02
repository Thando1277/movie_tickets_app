import { getAllAdmins } from "../services/admin.service.js";

export async function getAdmins(req, res){

    const admins = await getAllAdmins();

    if(!admins){
        return res.status(200).json({
            messgae: "No admins found"
        })
    }

    return res.status(200).json({ admins })
}