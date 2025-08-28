import { Doctor } from "../models/doctorSchema.js";



export const fetchDoctorDetails = async (req,res) => {

    const {doctorId} = req.params;

    try {
        const response = await Doctor.findById(doctorId)
        .select("firstName lastName speciality about licenseNo experience address education workStatus")
        .populate({
            path:"answers",
            select:"answerText",
            populate:{
                path:"query",
                select:"_id title"
            }

        })

        if(response){
            return res.send({
                message:"Doctor details fetched successfully",
                response
            })
        }
        
    } catch (error) {
        return res.send({
            message:"Error fetching Dr Details",
            error
        })
        
    }

}