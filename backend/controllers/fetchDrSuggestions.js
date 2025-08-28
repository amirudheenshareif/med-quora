import { Doctor } from "../models/doctorSchema.js";


export const fetchDrSuggestions = async(req,res)=> {
    try{
        const doctors = await Doctor.find({}).limit(3);
        res.send({
            message:"Doctors data fetched successfully",
            doctors
        })
    }
    catch(error){
        res.send({
            message:"error fetching doctor suggestions",
            error,
        })     
    }    
}