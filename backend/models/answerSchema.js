import mongoose from 'mongoose';


const answerSchema = mongoose.Schema({
    answerText:String,
    query:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Query"
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor"
    },
    time:{
        type:Date,
        default:Date.now
    },
    likes:Number,
    disLikes:Number,
})

export const Answer = mongoose.model("Answer",answerSchema);