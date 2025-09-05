import {useState,useEffect} from 'react'
import { statsData } from '../../data/helper.js'
import { BarLoader } from 'react-spinners';
import { AnsHistory } from '../../components/DoctorPortal/AnsHistory.jsx'
import axios from 'axios';

export const MyAnswers = () => {


  const doctorId = localStorage.getItem("userId");
  const[answerHistory,setAnswerHistory] = useState([]);
  const[isLoading,setIsLoading] = useState(false);
  const token = localStorage.getItem("token")

  const fetchMyAnswers = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`https://med-quora.onrender.com/doctors/answer-history/${doctorId}`,{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      });
      if(response){
        setAnswerHistory(response.data.answers);
        setIsLoading(false);
      } 
    } catch (error) {
      console.log("Error fetching answers", error); 
    }
  }

  useEffect(() => {
    fetchMyAnswers();
  },[])


  return (
    <>
    {
      isLoading ? <div className="w-full px-3 sm:px-6 my-4">
                   <BarLoader width='100%' color='#2563EB'/>
                 </div>:

    <div className='flex flex-col gap-4 mt-8 p-3 sm:p-6'>
        <div className='flex flex-col'>
            <h1 className='text-2xl font-extrabold'>My Answers</h1>
            <p className='text-sm text-slate-400'>Review your response history and patient interactions</p>
        </div>

        <div className="flex flex-col gap-2">
                {statsData.map(({ id, label, icon: Icon, iconClasses }) => (
                  <div key={id} className="bg-white p-4 rounded-md shadow-sm">
                    <div className="flex gap-2 items-center">
                      <Icon className={iconClasses} />
                      <div className="flex flex-col">
                        <p className="text-3xl font-extrabold">0</p>
                        <p className="text-sm text-slate-400">{label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className=' bg-slate-50'>
                 <div className='flex flex-col'>
                  <h1 className='text-2xl font-bold'>Answer history</h1>
                  <p className='text-sm text-slate-400'>{`${answerHistory?.length} of ${answerHistory?.length} answers`}</p>
                </div>
              
              <div className='h-[500px] overflow-y-scroll'>
               { answerHistory.map((answer) => (
                <AnsHistory key={answer._id} answer={answer}/>
               ))}
                
          </div>
       </div>
    </div>
}
    </>
  )
}
