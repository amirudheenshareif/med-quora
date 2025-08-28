import { Stethoscope } from 'lucide-react'
import React from 'react'
import { Badge } from '../components/ui/badge'
import { useNavigate } from 'react-router-dom'


export const ExploreDoctorsPage = () => {

  const navigate = useNavigate();
  return (
    <>
    <div className='mt-10 flex flex-col gap-6'>
      <div className='flex flex-col gap-1'>
         <h1 className='text-3xl font-bold'>Explore Doctors</h1>
        <p className='text-2xl text-slate-500'>Find verified medical professionals by specialty</p>
      </div>

      <div onClick={()=> navigate("/specializations")}  className='flex flex-col flex-wrap sm:flex-row'>
        <div className='bg-slate-100 rounded-md p-4 flex flex-col items-center gap-4'>
        <Stethoscope/>
        <h2 className='font-semibold text-2xl'>General Medicine</h2>
        <p>Primary care and general health concerns</p>
        <Badge>45 doctors available</Badge>
      </div>
      </div>

    </div>
    </>
  )
}
