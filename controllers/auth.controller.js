import supabase from '../config/supabase.js';
import bcrypt from 'bcrypt';

import GenerateToken from '../services/auth.service.js'

export async function register(req, res){
    try{
        const { full_name, email, age, password} = req.body;

        if(!full_name || !email || !age || !password){
            res.status(400).json({
                message: "All fields are required."
            })
        }

        if(!parseInt(age)){
            res.status(400).json({
                message: "Age needs to be a number"
            })
        }

        if(password.lengh < 6){
            res.status(400).json({
                message: "Password length must be more than 5 characters."
            })
        };


        const hashedPassword = await bcrypt.hash(password, 10);

        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    full_name,
                    email,
                    age,
                    password: hashedPassword
                }
            ])
            .select();

        if(error){
            return res.status(400).json({
                error: error.message
            })
        }

        res.status(200).json({
            message: "User registered successfully",
            user: data[0]
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }

};

export async function login(req, res){
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "Both email and password are required."
            })
        }

        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if(error){
            res.status(400).json({
                error: error.message
            })
        }

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const token = GenerateToken(user);

        res.status(200).json({
            message: "Logged in",
            token: token
        })

    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}

export default {
    register,
    login
};