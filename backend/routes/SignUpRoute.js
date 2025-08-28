import { Router } from "express";
import { Patient } from "../models/patientSchema.js";
import { Doctor } from "../models/doctorSchema.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();


const signUpRoute = Router();

signUpRoute.post("/patient", async(req,res)=> {

    const {firstName,lastName,age,sex,phoneNum,email,password} = req.body;

    const user = await Patient.findOne({email:email});

    if(user){
        return res.status(409).send({
            message:"Patient already exists",
            signUpStatus:true
        })
    }

    const patientAge = Number(age);
    const patientPhoneNum = Number(phoneNum)

    const session = await mongoose.startSession()
    session.startTransaction();
    let newUser;
    let token;

    try{
    const hashedPassword = await bcrypt.hash(password,10);
    newUser = await Patient.create([{
        firstName,
        lastName,
        age:patientAge,
        sex,
        phoneNum:patientPhoneNum,
        email,
        password:hashedPassword,
        role:"patient"
    }],{session})
    

    token = jwt.sign({userId:newUser[0]._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
    await session.commitTransaction()
    await session.endSession()

    }
    catch(error){
        console.log(error);
        await session.abortTransaction();
        await session.endSession()
        res.send({
            message:"Error while signing up",
            error:error
        })
    }

    res.status(200).send({
        message:"User created successfully",
        token:token,
        role:"patient",
        id:newUser[0]._id,
        firstName:newUser[0].firstName,
        lastName:newUser[0].lastName
    });
})





signUpRoute.post("/doctor", async(req,res) => {
     const {
        firstName,
        lastName,
        email,
        password,
        speciality,
        licenseNo,
        workStatus,
        education,
        address,
        experience,
        about
    } = req.body;

    const user = await Doctor.findOne({email:email});
    if(user){
        return res.status(409).send({
            message:"User already exists",
            signUpStatus:true
        })
         }

    // const licenseNumber = Number(licenseNo);
    let newUser;
    let token;
    const session = await mongoose.startSession();

    try{

        const hashedPassword = await bcrypt.hash(password,10);
        session.startTransaction();

         newUser = await Doctor.create([{
            firstName,
            lastName,
            email,
            password:hashedPassword,
            speciality,
            licenseNo,
            workStatus,
            education,
            address,
            experience,
            about
        }],{session})

        token = jwt.sign({userId:newUser[0]._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        await session.commitTransaction();
        await session.endSession();
    }
    catch(e){
        await session.abortTransaction();
        await session.endSession()
        return res.status(500).send({ message: "Something went wrong",
            error:e
         });
    }

    res.status(201).send({
            message:"User created successfully",
            token:token,
            role:"doctor",
            userId:newUser[0]._id,
            firstName:newUser[0].firstName,
            lastName:newUser[0].lastName
        })
})



export default signUpRoute;