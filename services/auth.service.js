import dotenv from 'dotenv/config'
import jwt from 'jsonwebtoken';

function GenerateToken(user){
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30m"
        }
    );

    return token
}

export default GenerateToken;