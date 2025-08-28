import React from 'react'
import { Badge } from './ui/badge'
import { Clock, MessageCircle, ThumbsUpIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const QnA = ({queryInfo}) => {
    const navigate = useNavigate();
    const queryId = queryInfo._id;
    let answer;

    if(queryInfo.answers.length > 0){
         answer = queryInfo.answers[0];
    }

    
  return (
    <div onClick = {()=> {navigate(`/question/${queryId}`)}} 
        className='flex flex-col cursor-pointer gap-3 bg-white rounded-2xl shadow-xl border border-gray-200 p-4'>
        <div className='flex flex-col text-left gap-2'>
            <h2 className='font-medium text-2xl'>{queryInfo?.title}</h2>
            <p>{queryInfo?.description}</p>
        </div>
        <div className='flex flex-col gap-2 sm:flex sm:gap-2'>
            <p >{`by ${queryInfo?.askedBy?.firstName}`}</p>
            <Badge>{queryInfo?.tag}</Badge>
            <div className='flex gap-1'>
                <Clock/>
                <p>2 hours ago</p>
            </div>
        </div>

        {/* Reply box */}

        {(queryInfo?.answers?.length ==0) ? <div className='bg-gray-50 p-3 mt-2 border-l-4 border-red-500 rounded-xl'>No answer yet</div> : 
        <div className='flex flex-col gap-2'> 
            <div className='bg-gray-50 p-3 mt-2 border-l-4 border-blue-500 rounded-xl text-sm text-gray-700 shadow-sm'>
            <div className='flex flex-col gap-2 sm:flex sm:gap-2'>
                <Badge className='w-8 h-8 rounded-full border border-gray-300 shadow-sm'>Dr</Badge>
                <p className='text-base font-medium text-gray-800'>{`${answer?.doctor?.firstName} ${answer?.doctor?.lastName}`}</p>
                <Badge className='mb-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full' variant="secondary">{answer?.doctor?.speciality}</Badge>
            </div>
            <p>{`${answer?.answerText.slice(0,150)}....`}</p>
        </div>
        <div className='flex gap-4 mb-1'>
            <div className='flex gap-2'>
                <MessageCircle/>
                <p>{`${queryInfo?.answers.length} replies`}</p>
            </div>
            <div className='flex gap-2'>
                <ThumbsUpIcon/>
                <p>12 Likes</p>
            </div>
        </div>
            
          </div>}

    </div>
  )
}
