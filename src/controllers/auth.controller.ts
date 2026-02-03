import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user_model";


const JWT_SECRET = process.env.JWT_SECRET || "Sporton 123";

// Untuk Masuk dengan akun yang ada
export const signin = async (req:Request, res:Response):Promise<void>=>{
    try{
        const { email, password } = req.body;

        // check if user exists or not
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({message:"Invalid Credentials, Email not found"});
            return;
        }

        // Validate Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            res.status(400).json({message:"Invalid Credentials, Wrong password!"});
            return;
        }

        // Generate JWT (JSON WEB TOKEN)
        const token = jwt.sign({id:user._id, email: user.email},JWT_SECRET,{
            expiresIn:"1d"
        })

        res.json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch(error){
        console.error("SIgn Error:",error);
        res.status(500).json({message:"Internal Server User Error"})
    }
};

// SIGNUP Atau Mendaftar AKun
export const initiateAdmin = async (req:Request, res:Response):Promise<void>=>{
    try{
        const {email, password, name}=req.body;

        // Check if user data entry is exist
        const count = await User.countDocuments({});
        if (count>0){
            res.status(400).json({
                message:"We can only have 1 admin user, if you want to create new admin user, please delete the user manually from the databese"
            })
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            password:hashedPassword,
            name,
        })
        await newUser.save();

        res.status(201).json({message:"Admin user created sucessfully!"});
    }catch (error){
        console.log("Initiate new admin user error:",error)
        res.status(500).json({message:"Internal Server User Error"})
    }
};