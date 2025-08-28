import React from 'react'
import { Badge } from '../ui/badge.jsx';

export const InboxMessage = ({inboxQuery,onClick}) => {

    const patientInfo = inboxQuery.askedBy;
  return (
     <div onClick={onClick} key={inboxQuery._id} className="py-2 px-1 border border-slate-200 hover:border-purple-500 transition-all duration-200 
             rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md cursor-pointer bg-white ">
          <div className="flex flex-col sm:flex-row gap-2">
            <p className='font-medium text-slate-800'>{`${(patientInfo != null) ? patientInfo.firstName: "Jon" } ${(patientInfo != null) ? patientInfo.lastName : "snow"}`}</p>
            <Badge className='text-white bg-purple-600 rounded-xl'>{inboxQuery?.type}</Badge>
          </div>
          <p className="text-sm text-slate-600 line-clamp-1">{inboxQuery?.title}</p>
          <p className="text-xs text-slate-400">{inboxQuery?.time}</p>
        </div>
  )
}
