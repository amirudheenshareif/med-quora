import mongoose from "mongoose";
import { Answer } from "../models/answerSchema.js";
import { Query } from "../models/querySchema.js";
import { Doctor } from "../models/doctorSchema.js";



export const postAnswer = async(req,res) => {
    const{queryId,doctorId,answerText} = req.body;
    const session = await mongoose.startSession();

    try {
        session.startTransaction()
        const answer = await Answer.create([{
            answerText,
            query:queryId,
            doctor:doctorId
        }],{session})

        if(answer){
            const query = await  Query.findByIdAndUpdate(queryId,{
                $push:{
                    answers:answer[0]._id
                },
                status:"Answered"   
            },{new:true,session})

            const doctor = await Doctor.findByIdAndUpdate(doctorId,{
                $push:{
                    answers:answer[0]._id
                }
            },{new:true,session})

            await session.commitTransaction();
            await session.endSession()

            //write logic to delete the dr id from the assignedTo property of Query collection

            const queryToUpdate = await Query.findByIdAndUpdate(query,{
                $pull:{
                    assignedTo:doctorId
                }
            },{new:true})

            return res.send({
                message:"Answer uploaded successfully",
                answer,
                query,
                queryToUpdate,
                doctor
            })
        }    
    } catch (error) {
        await session.abortTransaction();
        await session.endSession()
       return res.send({
                message:"error uploading answer",
                error
            })  
    }
}