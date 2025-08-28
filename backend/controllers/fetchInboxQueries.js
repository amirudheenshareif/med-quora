import { Query } from "../models/querySchema.js";


// For listing the inbox messages(queries) in 'my-inbox' page
export const fetchInboxQueries = async(req,res) => {

    const{doctorId} = req.params;

    try {

        const inboxQueries = await Query.find({assignedTo:doctorId}).populate({
            path:"askedBy",
            select:"firstName lastName age sex email phoneNum"
        })

        if(inboxQueries){
            return res.status(200).send({
                message:"inboxQueries fetched sucessfully",
                inboxQueries
            })
        }
        
    } catch (error) {
        res.send({
            message:"Error fetching inbox queries",
            error
        })     
    }
}

//For individual question and answer in 'query-reply' page

export const fetchInboxQuery = async(req,res) => {

    const{queryId} = req.params;

    try {
        const queryInfo = await Query.find({_id:queryId},"title description tag type time").populate({
            path:"askedBy",
            select:"firstName lastName age sex email phoneNum medicalHistory"
        })
        if(queryInfo){
            res.send({
                 message:"Success",
                 queryInfo:queryInfo[0]

            })
        }
        
    } catch (error) {
        return res.send({
            message:"Error fetching query for query-reply page",
            error
        })
        
    }
} 