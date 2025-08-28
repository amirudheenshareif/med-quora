import {Answer} from '../models/answerSchema.js'

export const fetchMyAnswers = async (req, res) => {
    const {doctorId} = req.params;

    try {
        const answers = await Answer.find({doctor:doctorId}).populate({
            path:"query",
            select:"title tag type",
            populate:{
                path:"askedBy",
                select:"firstName lastName"
            }
        })
        if(answers){
            return res.send({
                message:"Answers fetched successfully",
                answers
            })
        }
        
    } catch (error) {
        return res.send({
            message:"Errors fetching answers",
            error
        }) 
    }
}