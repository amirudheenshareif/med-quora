import { Patient } from "../models/patientSchema.js";
import {Query}  from "../models/querySchema.js";
import { analyseQuery } from "../utils/LLM.js";

export const postQuestion = async (req,res) => {
    const {title,description,medHistory,userId,doctorId} = req.body;
    

    // Get tag and type
   
    let tag;
    let type;
    let medicalHistory;

    try{
    const response = await analyseQuery(description,medHistory);
    tag = response?.tag;
    type = response?.type;
    medicalHistory= response?.medHistory;

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