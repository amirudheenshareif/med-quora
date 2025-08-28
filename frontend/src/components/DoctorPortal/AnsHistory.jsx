import React from 'react'
import { Badge } from '../ui/badge.jsx'

export const AnsHistory = ({answer}) => {
  return (
    <div className='bg-white flex flex-col gap-4 border-2 my-2 rounded-xl shadow-sm p-2 '>
        <div className='flex flex-col gap-2'>
            <h2 className='font-semibold'>{`${answer?.query?.askedBy?.firstName} ${answer?.query?.askedBy?.lastName}`}</h2>
            <Badge className='text-white bg-red-500'>{answer?.query?.tag}</Badge>
        </div>
        <p className='text-slate-500'>{answer?.query?.title}</p>
        <div className='flex gap-2'>
            <p>Answered</p>
            <p>2 likes</p>
        </div>
    </div>
  )
}
