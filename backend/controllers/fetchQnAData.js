import { Query } from "../models/querySchema.js"




export const fetchQnAData =  async (req,res) => {
    try{
        const response = await Query.find({}).select("title description tag type").populate({
           path:"askedBy",
           select:"firstName"
        }).populate({
             path:"answers",
             select:"answerText",
             populate:{
                path:"doctor",
                select:"firstName lastName speciality about licenseNo experience address education workStatus"
            }
        });

        if(response){
            return res.send({
                message:"Queries fetched successfully",
                queriesInfo:response
            })
        }

    }
    catch(err){
        console.log(err);
        
        return res.send({
            message:"Error fetching queries",
            err
        })
        
    }

}