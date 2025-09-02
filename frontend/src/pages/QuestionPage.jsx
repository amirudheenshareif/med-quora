import React from 'react'
import { Button } from '../components/ui/button'
import { Clock,MessageCircle,ThumbsUpIcon,ThumbsDownIcon} from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BarLoader } from 'react-spinners'

export const QuestionPage = () => {

  const navigate = useNavigate();
  const {queryId} = useParams();
  const token = localStorage.getItem("token")
  

  const fetchQnAData = async () => {
    const response = await axios.get("http://localhost:3000/questions/qna",{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      });
    // console.log(response.data.queriesInfo)
    return response.data.queriesInfo;
  }

  const{data,isLoading} = useQuery({
    queryKey:["QnAdata"],
    queryFn:fetchQnAData
  })

  const thisPageQuery = data?.find((obj) => obj._id == queryId);
  // console.log(thisPageQuery);
  
  const answers = thisPageQuery?.answers;

  return (
    
    <div className='p-3 sm:p-6'>
      {isLoading && <div className="w-full px-3 sm:px-6 my-4"><BarLoader width='100%' color='#2563EB'/></div>}

      {/* Question section */}

      <section className='flex flex-col gap-4 bg-white shadow-md mt-10 rounded-xl p-4'>
        <div className='flex gap-4'>
        <Button variant='outline' className='rounded-full'>{thisPageQuery?.askedBy?.firstName.slice(0,1)}</Button>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>{thisPageQuery?.title}</h1>
          <div className='flex flex-col justify-center sm:items-center gap-2 sm:flex-row sm:gap-2'>
            <p className="text-sm text-gray-500">
              Asked by <span className="font-medium text-gray-700">{thisPageQuery?.askedBy?.firstName}</span>
              </p>
            <Badge className='bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full'>{thisPageQuery?.tag}</Badge>
            <div className='flex gap-1'>
                <Clock className='w-4 h-4'/>
                <p className='text-xs text-gray-400'>2 hours ago</p>
            </div>
          </div> 
        </div>
      </div>
      <p className='text-base text-gray-700 leading-relaxed'>{thisPageQuery?.description}</p>
       <div className='flex gap-4 text-sm text-gray-600'>
            <div className='flex gap-2 items-center'>
                <MessageCircle className='w-4 h-4'/>
                <p>{`2 replies`}</p>
            </div>
            <div className='flex gap-2 items-center'>
                <ThumbsUpIcon className='w-4 h-4'/>
                <p>12 Likes</p>
            </div>
        </div>
      </section>

      {/* Answer Section */}

     
 <h1 className='my-6 border-b border-gray-200 pb-2 mb-4 text-lg font-semibold text-gray-900'>{`Medical Professional Response(${answers?.length})`}</h1>
  {answers?.map((answer)=> (
    <section key={answer._id} className='flex flex-col gap-4 bg-white shadow-md mt-10 rounded-xl p-4'>

      <div onClick={()=> navigate(`/doctors/${answer.doctor._id}`)} className='cursor-pointer flex gap-4'>
        <Button variant='outline' className='rounded-full'>{answer?.doctor?.firstName.slice(0,1)}</Button>
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col gap-2 sm:flex-row sm:gap-2'>
             <h3 className='text-base font-semibold text-gray-900'>{`Dr ${answer.doctor.firstName} ${answer.doctor.lastName}`}</h3>
            <Badge className='bg-green-100 text-green-600 rounded-full text-xs'>Verified</Badge>
          </div>
          <div className='flex flex-col sm:flex-row items-left gap-2'>
            <Badge className='font-light mt-2 sm:mt-0' variant="primary">{thisPageQuery?.tag}</Badge>
            <p className='text-sm text-gray-500 font-normal'>{`${answer?.doctor?.experience} years experience`}</p>
            <div className='flex gap-1 items-center'>
                <Clock className='w-4 h-4'/>
                <p className='text-xs text-gray-400'>2 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className='text-gray-700 mt-3 leading-relaxed'>{answer.answerText}</p>

<div className='flex gap-2 mt-4 text-sm text-gray-600'>
  <div className='flex gap-1 items-center'>
   <ThumbsUpIcon className='w-4 h-4'/>
   <p className='font-light'>8 Helpful</p>
  </div>
  <div className='flex gap-1 items-center'>
   <ThumbsDownIcon className='w-4 h-4'/>
   <p className='font-light'>8 Dislikes</p>
  </div>
</div>

      </div>
        </section>
  ))}
    </div>
  )
}

