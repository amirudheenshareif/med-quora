import { Router } from "express";
import { Query } from "../models/querySchema.js";

// import { getTagAndType } from "../utils/LLM.js";
// import { Patient } from "../models/patientSchema.js";
// import { Doctor } from "../models/doctorSchema.js";
// import { fetchMyQuestions } from "../controllers/fetchMyQuestions.js";
// import { Doctor } from "../models/doctorSchema.js";

export const testRoute = Router();

testRoute.post("/",async(req,res) => {
  const{title,description,medHistory} = req.body;

  // try {
  //   const resp = await getTagAndType(description,medHistory);
  //   if(resp){
  //     return res.send({
  //       msg:"success",
  //       resp
  //     })
  //   }
    
  // } catch (error) {
  //   return res.send({
  //     error
  //   })

    
  // }
 
})
  
//   async(req,res)=> {
//   const{docId , ansId} = req.body;

//   try {

//     const doctor = await Doctor.findByIdAndUpdate(docId,{
//       $push:{
//         answers:ansId
//       }
//     },{new:true})

//     if(doctor){
//       return res.send({
//         message:"answer inserted",
//         doctor
//       })
//     }
    
//   } catch (error) {
//     return res.send({
//       message:"error insertinf ans id"
//     })
    
//   }
// }
 



// const {age,sex,phoneNum} = req.body;
  // const resp = await getTagAndType(desc);
  

  // if(resp){
  //   return res.send({
  //     msg:"ok",
  //     resp
  //   })
  // }
  //  res.send({
  //     msg:"notok",
  //     resp
  //   })

  // try {

  //   const updatedDoc = await Patient.updateOne({_id:"68a35cfa607bc85cba009bd0"},{$set:{
  //     age:age,
  //     sex:sex,
  //     phoneNum:phoneNum
  //   }})

  //   if(updatedDoc){
  //     res.send({
  //       msg:"ok",
  //       updatedDoc
  //     })
  //   }
    
  // } catch (error) {
  //   res.send({
  //     msg:"not ok"
  //   })
    
  // }
  




  //     const {
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   speciality,
  //   about,
  //   licenseNo,
  //   experience,
  //   address,
  //   education,
  //   workStatus
  // } = req.body;

  // try {
  //   const doctor = await Doctor.create({
  //   firstName,
  //   lastName,
  //   email,
  //   password,
  //   speciality,
  //   about,
  //   licenseNo,
  //   experience,
  //   address,
  //   education,
  //   workStatus

  // })

  // if(doctor){
  //   return res.send({
  //       doctor,
  //       msg:"success"
  //   })
  // }
    
  // } catch (error) {
  //   return res.send({
  //       msg:"error creatinf dr doc",
  //       error
  //   })
    
  // }
  


