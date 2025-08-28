import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    sex:String,
    email:String,
    password:String,
    phoneNum:Number,
    medicalHistory:[{
        type:String
    }],
    queries:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Query"
    }]
})

export const Patient = mongoose.model("Patient",patientSchema)