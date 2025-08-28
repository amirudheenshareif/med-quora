import { Query } from "../models/querySchema.js";

export const fetchMyQuestions = async(req,res) => {
    const {id} = req.params;

    try {
        const questions = await Query.find({askedBy: id})
        .select("title description status tag time")
        .populate({
            path: "answers",
            select:"likes disLikes",
            populate:{
                path:"doctor",
                select:"firstName lastName speciality"
            }
        })
        if(questions){
            return res.send({
                message:"User questions fetched successfully",
                questions
            })
        }
    }catch (error) {
        res.send({
            message:"Error fetching user questions",
            error
        })
        
    }
}