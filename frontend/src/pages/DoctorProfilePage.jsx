import { BadgeCentIcon,Star, Briefcase,CheckCircleIcon,GraduationCapIcon,MapPin,MedalIcon,ThumbsUpIcon, MessageCircle } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { BarLoader } from 'react-spinners'
import { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export const DoctorProfilePage = () => {

  const{doctorId} = useParams();
  const navigate = useNavigate();
  const[isLoading,setIsLoading] = useState(false)
  const[docData,setDocData] = useState([]);
  const[answers,setAnswers] = useState([])
  const token = localStorage.getItem("token")


  const fetchDoctorDetails = async () =>{
    setIsLoading(true)
    const response = await axios.get(`https://med-quora.onrender.com/doctors/${doctorId}`,{
        headers:{
          Authorization:`Bearer ${token}` 
        }
      })
    // console.log(response?.data);
    setDocData(response.data?.response)
    setIsLoading(false)
  }

  useEffect(() => {
  setAnswers(docData?.answers || []);
}, [docData]);

  useEffect(()=> {
    fetchDoctorDetails();
  },[])


  
  return (
    <>
    {isLoading ?  
    <div className="w-full px-3 sm:px-6 my-4">
      <BarLoader width='100%' color='#2563EB'/>
    </div> :

    <div className='mt-8 flex flex-col gap-4 p-3 sm:p-6'>
      <section className='p-6 bg-gray-100 rounded-xl shadow-md flex flex-col gap-4'>
        <div className='w-25 h-25 bg-slate-50 rounded-full flex items-center justify-center font-semibold text-3xl text-gray-700'>
        <p>{docData?.firstName?.slice(0,1)}</p>
        </div>
        <div className='flex flex-col sm:flex-row gap-4'>
          <p className='text-2xl font-bold text-gray-900'>{`${docData?.firstName} ${docData?.lastName}`}</p>
          <Badge>Verified</Badge>
        </div>
       <p className='text-blue-600 font-medium text-lg'>{docData?.speciality}</p>
       <div className='flex flex-col sm:flex-row gap-3 text-sm text-gray-500'>
              <div className='flex gap-2 items-center'>
                <MapPin className='w-4 h-4'/>
              <p className='text-slate-500 font-light'>{docData?.address}</p>
              </div>
              <div className='flex gap-2 items-center'>
                <Briefcase className='w-4 h-4'/>
              <p className='text-slate-500 font-light'>{`${docData?.experience} years experience`}</p>
              </div>
            </div>
            <p>{docData?.education}</p>
      </section>


{/* Recent medical responses */}

      <section className='bg-white p-4 rounded-xl shadow-md flex flex-col'>
        <p className='text-2xl font-bold mb-5'>Recent Medical Responses</p>
       {answers?.map((answer)=> (
         <div onClick={()=> navigate(`/question/${answer.query._id}`)} key={answer._id} className='flex flex-col gap-2 my-2 border-b-2'>
          <h2 className='font-semibold text-gray-800 text-lg'>{answer?.query?.title}</h2>
          <p className='text-sm text-gray-500 leading-snug'>{`${answer?.answerText?.slice(0,100)} ...`}</p>
            <div className='flex gap-2 mb-2'>
              <p className='font-light text-xs text-gray-400'>2 hours ago</p>
              <div className='flex gap-1 items-center'>
             <ThumbsUpIcon className='w-4 h-4'/>
             <p className='text-xs text-gray-400'>8 Helpful</p>
            </div>
            </div>
        </div>
       ))}

      </section>


      {/* Professional Information */}

      <section className='bg-gray-100 rounded-xl shadow-md flex flex-col gap-2 p-6'>
        <h2 className='text-2xl font-semibold'>Professional Information</h2>

        <div className='flex flex-col my-2'>
          <div className='flex gap-2 items-center'>
            <GraduationCapIcon  className='h-5 w-5'/>
            <p className='text-sm font-semibold text-gray-700'>Education</p>
          </div>
          <p className='text-sm text-gray-600 '>{docData.education}</p>
        </div>

         <div className='flex flex-col my-2'>
          <div className='flex gap-2 items-center'>
            <MedalIcon className='h-5 w-5'/>
            <p className='text-sm font-semibold text-gray-700'>Registeration No.</p>
          </div>
          <p className='text-sm text-gray-600 '>{docData?.licenseNo}</p>
        </div>

         <div className='flex flex-col my-2'>
          <div className='flex gap-2 items-center'>
            <CheckCircleIcon  className='h-5 w-5'/>
            <p className='text-sm font-semibold text-gray-700'>Work Status</p>
          </div>
          <Badge className='mt-2 text-xs font-semibold bg-gray-200 text-gray-700 rounded-full'>{docData?.workStatus}</Badge>
        </div>
      </section>

      <section className='p-6 bg-gray-100 rounded-xl shadow-md flex flex-col gap-4'>
        <h3 className='text-2xl font-semibold'>Badges & Awards</h3>
        <div className='flex gap-2 items-center'>
          <Star className=' text-yellow-500'/>
          <p className='text-sm font-medium'>Top Contributer</p>
        </div>
         <div className='flex gap-2 items-center'>
          <BadgeCentIcon className=' text-pink-500'/>
          <p className='text-sm font-medium'>Patient Favorite</p>
        </div>
         <div className='flex gap-2 items-center'>
          <MessageCircle className=' text-green-500'/>
          <p className='text-sm font-medium'>Quick Responder</p>
        </div>

      </section>
    </div>
}
    </>
  )
}
