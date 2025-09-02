import { Brain, Briefcase, InboxIcon, PhoneCall, Plane, Sparkle, User2Icon } from 'lucide-react'
import {Badge} from '../../components/ui/badge.jsx'
import {Textarea} from '../../components/ui/textarea.jsx'
import { Button } from '../../components/ui/button.jsx'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { toast,Zoom } from 'react-toastify'
import { BarLoader } from 'react-spinners'


export const QueryReply = () => {

const {queryId} =useParams();
const[queryInfo,setQueryInfo] = useState({});
const[isLoading,setIsLoading] = useState(false);
const[patientDetails,setPatientDetails] = useState({});
const[aiSuggestion,setAiSuggestion] = useState("");
const[generatingSuggestion,setGeneratingSuggestion]=useState(false)
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token")

const fetchQueryInfo = async () => {
    try {
        setIsLoading(true);
        const response = await axios.get(`https://med-quora.onrender.com/doctors/query-reply/${queryId}`,{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      });
        
        
        if(response){
            setQueryInfo(response.data.queryInfo);
            setPatientDetails(response.data.queryInfo.askedBy)
            setIsLoading(false);
             
        }    
    } catch (error) {
        console.log("Err fetching QueryInfo",error); 
    }
}

const fetchAiSuggestion = async () => {
     try {
        setGeneratingSuggestion(true)
        const response = await axios.post("https://med-quora.onrender.com/answer/generate",{question:queryInfo?.description},{
        headers:{
              Authorization:`Bearer ${token}` 
        }
        });
        if(response){
            setAiSuggestion(response?.data?.generatedAnswer);
            setGeneratingSuggestion(false)
        }  
    } catch (error) {
        console.log("Err fetching generated Answewr",error); 
    }  
}

useEffect(() => {
  fetchQueryInfo();
}, []);

const sendResponse = async () => {
    setAiSuggestion("");
    try {
        const response = await axios.post("https://med-quora.onrender.com/answer/post",{
            queryId,
            doctorId:userId,
            answerText:aiSuggestion
        },{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      })
        toast.success('Response sent', {
                                   position: "top-center",
                                   autoClose: 2000,
                                   hideProgressBar: false,
                                   closeOnClick: false,
                                   pauseOnHover: true,
                                   draggable: true,
                                   progress: undefined,
                                   theme: "light",
                                   transition: Zoom,
                                   });
        if(response){
            console.log(response.data);  
        }
        
    } catch (error) {
        console.log("Error sending response",error);
        
        
    }
}





  return (
    <>
    {isLoading ? <div className="w-full px-3 sm:px-6 my-4"><BarLoader width='100%' color='#2563EB'/></div>:
        <div className='mt-8 flex flex-col gap-5 p-3 sm:p-6'>
        {/* Patient info */}
        <div className='flex flex-col gap-6 rounded-md bg-white shadow-md p-4'>
            <div className='flex gap-2 items-center'>
                <User2Icon/>
                <p className='font-bold text-2xl'>Patient Information</p>
            </div>

            <div className='flex flex-col border-b-2 pb-2'>
                <p className='text-lg font-bold'>{`${patientDetails?.firstName} ${patientDetails.lastName}`}</p>
                <p className='text-sm text-slate-400'>{`${patientDetails?.age} years old , ${patientDetails?.sex}`}</p>
            </div>

            <div className='flex flex-col text-sm text-slate-400 border-b-2 pb-2'>
                <div className='flex gap-2'>
                    <InboxIcon/>
                    <p>{patientDetails?.email}</p>
                </div>
                <div className='flex gap-2'>
                    <PhoneCall/>
                    <p>{patientDetails.phoneNum}</p>
                </div>
            </div>

            <div className='flex flex-col gap-2 border-b-2 pb-2'>
                    <p className='font-semibold'>Medical History</p>
                    <div className='flex gap-1'>
                        {patientDetails?.medicalHistory?.length > 0 ? patientDetails?.medicalHistory?.map((history,index)=> (
                            <Badge key={index} className='bg-white'>{history}</Badge>
                        )): 
                        <Badge className='bg-white'>Hypertension</Badge>
                        }
                        
                    </div>
                </div>

            <Badge className='bg-red-500 text-white mb-2'>{queryInfo?.type}</Badge>
        </div>

        {/* Patient query */}

        <div className='bg-white shadow-md p-4 flex flex-col gap-4'>
           <div className='flex flex-col'>
             <p className='font-bold'>Patient Query</p>
            <div className='flex gap-2 items-center'>
                <Briefcase className='text-slate-500'/>
                <p className='text-sm text-slate-400'>5 min ago</p>
            </div>
           </div>

           <div className='flex flex-col gap-2 border-b-2 pb-2'>
            <p className='font-semibold'>Subject:</p>
            <p className='text-slate-400'>{queryInfo?.title}</p>
           </div>

            <div className='flex flex-col gap-2 border-b-2 pb-2'>
            <p className='font-semibold'>Full Description:</p>
            <p className='text-slate-400'>{queryInfo?.description}</p>
           </div>
        </div>

        {/* AI Suggestion box */}

        <div className='flex flex-col gap-2 bg-purple-50 p-4 rounded-md'>
            <div className='flex flex-col gap-1'>
            <div className='flex gap-2 items-center'>
                <Brain className='text-purple-500'/>
                <p className='font-bold'>AI Medical Assistant</p>
            </div>

            <div onClick={fetchAiSuggestion} className='w-fit px-3 py-1 flex gap-2 items-center shadow-md rounded-full cursor-pointer bg-purple-300 border-1 border-purple-500 hover:bg-purple-400 transition'>
                <Sparkle className='h-4 w-4 text-purple-600'/>
                <p className='text-purple-700 text-xs font-medium '>Generate Suggestion</p>
            </div>
        </div>

        <p className='text-slate-400 font-light'>AI-powered medical response suggestions based on symptoms and patient history</p>
        </div>

        {/* Response section */}

        <div className='bg-white shadow-md p-4 rounded-md flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <h2 className='font-bold'>Your Response</h2>
                <p className='font-light text-slate-400'>Provide your medical advice and recommendations</p>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Response</p>
                <Textarea onChange={(e)=> setAiSuggestion(e.target.value)} 
                value={generatingSuggestion? "Generating Suggestion..." : aiSuggestion} 
                className='text-slate-400' placeholder='Type your response to the patient..'>
                    
                </Textarea>
            </div>

            <div onClick={sendResponse}>
                <Button className='flex gap-2 bg-purple-600 text-white'>
                    <Plane/>
                    Send Response
                </Button>
            </div>
        </div>


    </div>
}
    </>
  )
}
