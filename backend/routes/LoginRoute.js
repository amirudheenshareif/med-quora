import { Router } from "express";
import { Doctor } from "../models/doctorSchema.js";
import { Patient } from "../models/patientSchema.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();


const loginRoute = Router();

loginRoute.post("/patient", async (req,res) => {
    const{email,password} = req.body;
    
    const user = await Patient.findOne({email:email});

    if(!user){
        return res.status(404).send({
            message:"User doesn't exist",
            loginStatus:false
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);

    if(!isPasswordCorrect){
        return res.status(401).send({
            message:"incorrect password",
            passwordStatus:"incorrect",
        })
    }

    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
    res.status(200).send({
        message:"login successful",
        token:token,
        role:"patient",
        firstName:user.firstName,
        lastName:user.lastName,
        userId:user._id
    })

})

loginRoute.post("/doctor", async(req,res)=> {
    const { email, password } = req.body;

    const user = await Doctor.findOne({ email: email });

    if (!user) {
        return res.status(404).send({
            message: "User doesn't exist",
            loginStatus: false,
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(401).send({
            message: "Incorrect password",
            loginStatus: false,
        });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY,{expiresIn:"1h"});

    res.status(200).send({
        message: "Login successful",
        loginStatus: true,
        token: token,
        firstName:user.firstName,
        lastName:user.lastName,
        userId:user._id,
        role:"doctor"
    });
});




export default loginRoute;