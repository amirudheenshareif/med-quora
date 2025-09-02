import React from 'react'



export const DoctorSuggestion = ({docObj,doctorId,setDoctorId}) => {

  
  const toggle = (id) => {
  if(doctorId.includes(id)){
    setDoctorId(doctorId.filter((drId)=> drId != id))
  }
  else{
    setDoctorId((prev) => [...prev,id])
  }
 }

  
  return (
    <div className='bg-white border border-gray-200 rounded-2xl shadow-sm p-2 flex items-center gap-4 hover:shadow-md transition cursor-pointer'>
      <div className='w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-semibold text-lg text-gray-700'>
        <p>{docObj?.firstName?.slice(0,1)}</p>
      </div>
      <div className='flex w-full justify-between'>
        <div className='flex flex-col'>
        <h2 className='text-lg font-semibold text-slate-900'>{`${docObj.firstName} ${docObj.lastName}`}</h2>
        <p className='text-sm text-gray-600'>{docObj.speciality}</p>
        <p className='text-xs text-gray-500 mt-1'>342 questions answered</p>
      </div>
      <input checked={doctorId.includes(docObj._id)} onChange={()=> toggle(docObj._id)} className='mr-4' type='checkbox'/>
      </div>
      
    </div>
  )
}
