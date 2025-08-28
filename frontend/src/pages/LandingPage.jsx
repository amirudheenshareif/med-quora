import {useState,useEffect} from 'react'
import { specialities } from '../data/helper'
import { QnA } from '../components/QnA'
import { useNavigate } from 'react-router-dom'
import { SignUp } from '../components/SignUp'
import { Button } from '../components/ui/button'
export const LandingPage = () => {


const navigate = useNavigate();
const[modalStatus,setModalStatus] = useState(false);

useEffect(()=> {
  console.log(localStorage);
},[])



  return (
    
  <>
   {modalStatus ? (
    <div className='relative'><SignUp/></div>
   ): (
    <div className='mt-14 flex flex-col gap-6'>
     <section className='flex flex-col gap-6'>
       <h1 className='text-center text-slate-900 text-3xl sm:text-4xl md:text-5xl font-bold '>Connect with Verified Doctors</h1>
      <p className='text-center text-2xl text-gray-600 sm:text-3xl md:text-4xl font-light'>Get expert medical advice from certified healthcare professionals. Ask questions, get answers, and take control of your health.</p>
      <div className='flex justify-center gap-3'>
        <Button onClick={()=> {navigate("/feed")}} className='bg-blue-600 hover:bg-blue-700  text-white p-4 rounded-full shadow-lg  bottom-6 right-6 transition'>Ask a Question</Button>
        <Button variant='outline' onClick={()=> navigate("/dr-signup")} className="px-5 py-2 rounded-xl bg-emerald-500 text-white font-semibold shadow-sm hover:bg-emerald-600 transition">Join as Doctor</Button>
      </div>
     </section>

     <section>
      <h2 className='mb-5 text-center text-slate-700  text-2xl sm:text-3xl md:text-4xl font-semibold '>Medical Specialities</h2>
      <div className='flex justify-center flex-wrap gap-3'>
        {specialities.map((speciality)=>(
        <div className='p-5 w-[300px] bg-white rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition flex flex-col items-center' key={speciality.id}>
          <p>{speciality.icon}</p>
          <p className='text-base font-semibold text-slate-800 text-center'>{speciality.specialityName}</p>
          <p>{speciality.noOfQuestions}</p>
        </div>
      ))}
      </div>
     </section>

     <section className='flex flex-col gap-2'>
      <h2 className='mb-5 text-center text-2xl sm:text-3xl md:text-4xl font-bold '>Recent Questions</h2>
      {/* <QnA/> */}
     </section>
    </div>
   )}
  </>
  )
}
