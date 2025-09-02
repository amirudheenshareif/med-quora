import {React,useEffect,useState} from 'react'
import {Button} from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { QnA } from '../components/QnA'
import { DoctorSuggestion } from '../components/DoctorSuggestion'
import { categories } from '../data/helper'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BarLoader } from 'react-spinners'
import { toast,Zoom } from 'react-toastify'

export const FeedPage = () => {
  const[askQuestionModal,setAskQuestionModal] = useState(false);
  const[posting,setPosting] = useState(false);
  const[title,setTitle] = useState("");
  const[description,setDescription]= useState("");
  const[medHistory,setMedHistory] = useState("")
  const[doctorSuggestions,setDoctorSuggestions] = useState([]);
  const[questions,setQuestions] = useState([]);
  const[allQuestions,setAllQuestions] = useState([]);
  const[doctorId,setDoctorId] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token")
  console.log(token);
  
  
  const queryData = {
    title,
    description,
    userId,
    doctorId,
    medHistory
  }




  const fetchQnAData = async() => {
  try {
      const response = await axios.get("https://med-quora.onrender.com/questions/qna",{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      });
      // console.log("data of qna",response.data.queriesInfo);
      return response.data.queriesInfo;
  } catch (error) {
    console.log("Error fetching QnA data");
    return [];
    
  }
} 


  const {isLoading,data,error} = useQuery({
        queryKey:["QnAdata"],
        queryFn:fetchQnAData
      })
  

  const postQuestion =  async () => {
    setPosting(true)
    try {
      const response = await axios.post("https://med-quora.onrender.com/questions/post",queryData,{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      });
      setAskQuestionModal(false);
      setPosting(false);
      toast.success('Question Posted!', {
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
    } catch (error) {
      console.log(error);
      
    }  
  }

 
 const fetchDoctorSuggestion = async ()=> {
          try{
            const res = await axios.get("https://med-quora.onrender.com/doctors/suggestions",{
        headers:{
          Authorization:`Bearer ${token}` 
        }
        });
            setDoctorSuggestions(res.data.doctors);
            // console.log(res);  
          }
          catch(err){
            console.log(err,"Error fetching dr suggestions")
         }        
 }

 useEffect(()=> {
  fetchDoctorSuggestion();
  console.log(doctorSuggestions);
 },[])


 useEffect(()=> {
  if(data){
    setAllQuestions(data);
    setQuestions(data);
  }
 },[data])


 const filterByCategory = (category) => {
  if(category === "All"){
    setQuestions(allQuestions);
  }
  else{
    const filteredQuestions = allQuestions.filter((question) => question.tag === category );
    setQuestions(filteredQuestions);
  }
 }


  return (
    <div>
      {(askQuestionModal) ? (
        <div className="flex flex-col gap-3 p-3 sm:p-6"> 
          <Input onChange={(e)=> setTitle(e.target.value)} className=' border border-gray-300 rounded-xl px-4 py-2 text-slate-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"'
           type="text" placeholder="Question title..."/>
          <Textarea onChange={(e) => setDescription(e.target.value)} className=' border border-gray-300 rounded-xl px-4 py-2 text-slate-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none resize-none' 
          type = "text"  placeholder="Describe your medical concern in detail..."/>
          <Textarea onChange={(e) => setMedHistory(e.target.value)} className='mb-3 border border-gray-300 rounded-xl px-4 py-2 text-slate-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none resize-none' 
          type = "text"  placeholder="Mention your medical history..."/>
          <div className='flex gap-2 mb-3'>
            <Button onClick={postQuestion} variant ="outline" className='mb-3 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition"'>{`${posting ? "Posting..." : "Post Question"}`}</Button>
            <Button disabled={posting} onClick={()=> {setAskQuestionModal(false)}} className='rounded-xl bg-gray-100 text-gray-700 border border-gray-300 font-medium hover:bg-gray-200 transition'>Cancel</Button>
          </div>
          {doctorSuggestions?.map((docObj)=> (
            <DoctorSuggestion  key={docObj._id} docObj={docObj} doctorId={doctorId} setDoctorId={setDoctorId}/>
          ))}

          </div>)
      
      
      
      
      
      :(<div>
        <section className='mt-8 flex gap-2 p-3 sm:p-6'>
        <Input disabled={true} type = "text" placeholder="Ask your question"/>
        <Button className='bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition' 
        onClick={()=> {setAskQuestionModal(true)}}>+</Button>
      </section>
      <div className='w-full overflow-x-auto no-scrollbar flex gap-2 p-3 sm:p-6 '>
        {categories.map((category)=>(
          <Button
          onClick={ ()=> filterByCategory(category.name)}
          className=" bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full cursor-pointer hover:bg-blue-200 transition" 
          key={category.id}>{category.name}</Button>
        ))}
      </div>

      {isLoading && <div className="w-full px-3 sm:px-6 my-4"><BarLoader width='100%' color='#2563EB'/></div>}

      {questions?.map((queryInfo)=>(
        <div key={queryInfo._id} className='px-3 py-1 sm:px-6 flex flex-col gap-2'>
          <QnA queryInfo={queryInfo} />
        </div>
        
      ))}
      
      </div>

    
    
    
    
    
    
    
    
    
    
    )}
      
    </div>
  )
}
