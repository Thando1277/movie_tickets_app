import dotenv from 'dotenv/config'
import jwt from 'jsonwebtoken';

function GenerateToken(user){
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            full_name: user.full_name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return token
}

export default GenerateToken;