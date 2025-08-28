import mongoose from 'mongoose';


const querySchema = mongoose.Schema({
    title: String,
    description: String,
    tag:String,
    type:{
        type:String,
        enum:["Emergency","Moderate","Life style"]
    },
    status:{
        type:String,
        enum:["Pending","Answered"],
        default:"Pending"
    },
    time:{
        type:Date,
        default:Date.now
    },
    askedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"

    },
    assignedTo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    }],
    answers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Answer"
    }],
    
})

export const Query = mongoose.model("Query",querySchema);
