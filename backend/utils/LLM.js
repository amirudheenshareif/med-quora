import axios from 'axios'
import dotenv from 'dotenv'


dotenv.config();



 export const analyseQuery = async (description, medHistory) => {

    const prompt = `
You are a medical query classifier.

Analyze the following query and patient's medical history. Extract only the important keywords from the medical history (diagnoses, conditions, allergies, surgeries, or significant health terms) as an array of capitalized strings.

Return a JSON object with exactly three keys:
- "tag": strictly one of (General Medicine, Cardiology, Neurology, Dermatology, Pediatrics, Orthopedics, Psychiatry)
- "type": strictly one of ("Emergency", "Moderate", "Lifestyle") — ensure the first letter is capitalized exactly as shown.
- "medHistory": an array of keywords (each word capitalized, no duplicates, and only important terms)

Examples:
Query: "I have had a dry cough for two weeks"
Medical History: "I had mild asthma during childhood"
Response:
{"tag": "General Medicine", "type": "Moderate", "medHistory": ["Asthma"]}

Query: "I'm feeling dizzy and my vision is blurry"
Medical History: "I have diabetes and high blood pressure"
Response:
{"tag": "Neurology", "type": "Emergency", "medHistory": ["Diabetes", "Hypertension"]}

Return ONLY JSON. No explanations, no extra text.

Query: "${description}"
Medical History Paragraph: "${medHistory}"
Response:
`;

    try {
      const response = await axios.post(process.env.LLM_URL,{
       model: "mistralai/mistral-small-3.2-24b-instruct:free",
       messages:[{
             role:"user",
             content:prompt
       }],
       temperature:0,
    },
    {
    headers:{
        "Content-type":"application/json",
        "Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`
     }})

     const resp = response.data.choices[0].message.content;
     const cleaned = resp.replace(/```json|```/g, '').trim();


     if(cleaned){
       let jsonResp;
       try {
         jsonResp = JSON.parse(cleaned);
       } catch (e) {
         return { error: "Invalid JSON from LLM", raw: cleaned };
       }

      return {
         tag:jsonResp.tag,
         type:jsonResp.type,
         medHistory:jsonResp.medHistory
      }
     }
      
    } catch (error) {
      return {
         error
      }
      
    }
     }

   //   const tagMatch = resp.match(/tag:\s*(.*?),/);
   //   const typeMatch = resp.match(/type:\s*(.*?)(\n|```)/);

// const tag = tagMatch ? tagMatch[1].trim() : null;
// const type = typeMatch ? typeMatch[1].trim() : null;

   //   return {
   //      tagMatch,
   //      typeMatch
   //   };



