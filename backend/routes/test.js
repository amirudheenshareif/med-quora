import { Router } from "express";
export const testRoute = Router();
// import { Patient } from "../models/patientSchema.js";
// import { Query } from "../models/querySchema.js";
import { fetchMyAnswers } from "../controllers/fetchMyAnswers.js";

testRoute.get("/:doctorId", fetchMyAnswers
  // async(req,res) => {
  //   const{doctorId} = req.params;
  //   try {
      
  //     // await Patient.deleteMany({});
  //     // await Query.deleteMany({});
  //     // res.status(200).json({message:"All collections cleared"})
      
  //   } catch (error) {
  //     res.status(500).json({message:"Error clearing collections",error:error.message})
      
  //   }
  // }
)


// async(req,res) => {
//   const {description,medHistory} = req.body;

//   try {
//     const response = await analyseQuery(description,medHistory);
//     res.status(200).json({message:"All collections cleared",response})
//   }
//   catch(e){
//     res.status(500).json({message:"Error clearing collections",error:e.message})
//   }
// }


