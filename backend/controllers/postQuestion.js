import { Patient } from "../models/patientSchema.js";
import {Query}  from "../models/querySchema.js";
import { analyseQuery } from "../utils/LLM.js";

export const postQuestion = async (req,res) => {
    const {title,description,medHistory,userId,doctorId} = req.body;
    

    // Get tag and type
    const response = await analyseQuery(description,medHistory);
    const tag = response?.tag;
    const type = response?.type;
    const medicalHistory= response?.medHistory;

    try{

      const query = await Query.create([{
        title,
        description,
        tag:tag,
        type:type,
        askedBy:userId,
        assignedTo:doctorId
      }])

      if(query){
        const patient = await Patient.findByIdAndUpdate(userId,{
          $push:{
            queries:query[0]._id,
            medicalHistory:{
              $each:medicalHistory,
            }
          },
          
        },{new:true})


        return res.send({
          message:"Success",
          query,
          patient
        })
      }
    }
    catch(err){
      res.send({
        message:"Error posting questions",
        err
      }) 
    }
}