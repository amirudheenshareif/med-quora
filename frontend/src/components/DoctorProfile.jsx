import React from 'react'
import { Badge } from './ui/badge';
import { LocateFixedIcon, MapPin, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export const DoctorProfile = () => {
    const navigate = useNavigate();
  return (
    <div className='mt-10 bg-slate-100 rounded-md p-6'>
        <div className='flex flex-col  sm:flex-row gap-2'>
          <Button className='w-8 h-8 rounded-full'>Dr</Button>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col sm:flex-row gap-2'>
              <p className='sm:text-2xl font-medium'>Dr.James Wilson</p>
              <Badge>Verified</Badge>
            </div>
            <p className='font-medium text-blue-500'>General Medicine</p>
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                <MapPin/>
              <p className='text-slate-500 text-sm font-light'>New York, NY 15 years</p>
              </div>
              <p className='text-slate-500 text-sm font-light'>15 years experience</p>
            </div>
          </div>
        </div>

        <div className='flex items-center my-3 gap-1'>
          <MessageCircle/>
          <p className='text-slate-500 text-sm '>342 questions answered</p>
        </div>
         <Badge>Patient Favorite</Badge>
      </div>
  )
}
