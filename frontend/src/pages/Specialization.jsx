import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import React from 'react'
import { DoctorProfile } from '../components/DoctorProfile';

export const Specialization = () => {

  const navigate = useNavigate();
  return (
    <div className='mt-10'>
      <div className='flex flex-col sm:flex-row justify-between'>
        <div className='flex flex-col gap-2 mb-6'>
           <h1 className='text-3xl font-bold'>General Medicine Specialists</h1>
           <p className='text-2xl text-slate-500'>Find verified general medicine specialists</p>
        </div>
        <div className='flex items-center'>
          <Button onClick={()=> navigate("/doctors")}>View All Categories</Button>
        </div>
      </div>

      <DoctorProfile/>
    </div>
  )
}
