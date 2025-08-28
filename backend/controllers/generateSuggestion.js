import axios from "axios";
import dotenv from 'dotenv'


dotenv.config()



export const generateSuggestion = async (req,res) => {

    const{question} = req.body;

    const prompt = `You are a doctor replying to a patient’s medical query.
	•	Give a concise, medically sound, and professional response.
	•	Avoid filler phrases like “I understand your concern” or “I’m sorry to hear that.”
	•	Write in a natural tone, as if you’re directly speaking to the patient.
	•	Suggest practical next steps or advice if needed.
	•	Keep it between 3–5 sentences unless more detail is required for clarity.
	•	Do not sound like AI; sound like a real doctor giving a quick assessment.
    ${question}`;

    try {

        const response = await axios.post(`${process.env.LLM_URL}`,{
            model:"mistralai/mistral-small-3.2-24b-instruct:free",
            messages:[{
                role:"user",
                content:prompt
            }]
        },{
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`
            }
        })

        if(response){
            return res.send({
                message:"answer generated successfully",
                generatedAnswer:response.data.choices[0].message.content
            })
        }
        
    } catch (error) {
        return res.send({
            message:"Error generating answer",
            error
        })
        
    }

   
}