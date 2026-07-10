import dotenv from 'dotenv/config'
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next){
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            message: "Access token required"
        })
    }

    try{
        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    }catch(error){
        return res.status(401).json({
            error: "Invalid or expired token"
        })
    }
}

export default authenticateToken;