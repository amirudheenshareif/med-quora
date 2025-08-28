import mongoose from "mongoose";


const doctorSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    licenseNo:{
        type:String,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    workStatus:{
        type:String,
        required:true
    },
    answers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answer"
    }]
})


export const Doctor = mongoose.model("Doctor",doctorSchema);