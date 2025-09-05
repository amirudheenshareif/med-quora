import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Clock,MessageCircle,ThumbsUpIcon } from 'lucide-react'
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BarLoader } from 'react-spinners'

export const MyQuestionsPage = () => {

  const navigate = useNavigate();
  const[isLoading,setIsLoading] = useState(false)
  const userId = localStorage.getItem("userId")
   const[allQuestions,setAllQuestions] = useState([]);
  const[myQuestions,setMyQuestions] = useState([]);
  const[pendingQuestions,setPendingQuestions] = useState([]);
  const[answeredQuestions,setAnsweredQuestions] = useState([]);
  const[activeStatus,setActiveStatus] = useState("All");
  const token = localStorage.getItem("token")


  const fetchMyQuestions = async()=> {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://med-quora.onrender.com/questions/patient/${userId}`,{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      });
      if(response){
        // console.log(response.data);
        setAllQuestions(response?.data?.questions)
        setMyQuestions(response?.data?.questions)
        setIsLoading(false);
      }
      
    } catch (error) {
      console.log("Error fetching my questions", error);
    }
  }

  const fetchPendingQuestions = () => {
    const pending = allQuestions?.filter(question => question.status === "Pending");
    setPendingQuestions(pending);
    const answered = allQuestions?.filter(question => question.status === "Answered");
    setAnsweredQuestions(answered);
    // console.log("Pending questions:", pending);
    // console.log("Answered questions:", answered);
  }

  useEffect(()=> {
    fetchMyQuestions();
  },[])

  useEffect(()=> {
    fetchPendingQuestions();
  },[myQuestions])



  return (
       <>
       {isLoading ?  
              <div className="w-full px-3 sm:px-6 my-4">
                <BarLoader width='100%' color='#2563EB'/>
              </div> :
    <div className='mt-10 flex flex-col gap-6 p-3 sm:p-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-bold'>My Questions</h1>
        <p className='text-2xl text-slate-500'>Track your medical questions and responses from doctors</p>
        <div className='flex flex-wrap gap-1 '>
          <Button onClick={() => {
            setMyQuestions(allQuestions)
            setActiveStatus("All")
            }} className={`mt-2 ${activeStatus=="All" ? 'bg-blue-600 text-white' : ""}`}   variant='outline'>{`All Questions`}</Button>
          <Button onClick={() => {
            setMyQuestions(answeredQuestions)
            setActiveStatus("Answered")
            }} className={`mt-2 ${activeStatus=="Answered" ? 'bg-green-600 hover:bg-green-600 text-white' : ""}`}
            variant='outline' >{`Answered`}</Button>
          <Button onClick={() => {
            setMyQuestions(pendingQuestions)
            setActiveStatus("Pending")
            }} className={`mt-2 ${activeStatus=="Pending" ? 'bg-yellow-500 hover:bg-yellow-500 text-white' : ""}`} variant='outline'>{`Pending`}</Button>
        </div>
      </div>

      {myQuestions.length === 0 && (
        <div>No questions in this status</div>
      )}

       {myQuestions?.map((question) => (
        <div key={question._id} onClick={()=> navigate(`/question/${question._id}`)} className='bg-white shadow-md p-4 rounded-xl flex flex-col gap-2 '>
        <div className='flex-col text-left gap-2'>
            <h2 className='font-medium text-2xl'>{question.title}</h2>
             <p className='text-slate-500'>I've been experiencing severe headaches daily for the past week. They usually start in the morning and get worse throughout the day. Should I be concerned?</p>
             <div className='my-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2'>
            <Badge>{question.tag}</Badge>
            <div className='flex gap-1'>
              <Clock className='w-4 h-4'/>
              <p className='text-xs text-gray-400'>2 hours ago</p>
            </div>
            
        </div>
       </div>

       {question?.status === "Pending"? <div className='bg-gray-50 p-3 mt-2 border-l-4 border-red-500 rounded-xl'> No answer yet</div> :
       <div>
        <div className='px-2 py-3 bg-gray-50 p-3 mt-2 border-l-4 border-blue-500 rounded-xl flex flex-col sm:flex-row gap-2'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
            <Button variant='outline' className='w-8 h-8 rounded-full'>Dr</Button>
           <p className='text-green-800'>{`Answered by ${question.answers[0]?.doctor?.firstName}`}</p>
          </div>
          <Badge>{question?.tag}</Badge>
        </div>
       </div>
       }

       {/* likes and replies */}
       <div className='flex gap-4'>
            <div className='flex gap-2 items-center'>
                <MessageCircle className='w-4 h-4'/>
                <p className='font-light text-slate-500'>2 replies</p>
            </div>
            <div className='flex gap-2 items-center'>
                <ThumbsUpIcon className='w-4 h-4'/>
                <p className='font-light text-slate-500'>12 Likes</p>
            </div>
        </div>
       </div>
       ))}

    </div>}
       </>
  )
}
