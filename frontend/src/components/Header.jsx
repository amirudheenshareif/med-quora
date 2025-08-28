import {useState,useEffect, useContext} from 'react'
import { FileQuestionMark, LogOut, MessageCircle, Stethoscope, User2Icon,Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {Button} from '../components/ui/button'
import { AuthContext } from '../App.jsx'





export const Header = () => {

  const navigate = useNavigate();
  const {isSignedIn,setIsSignedIn} = useContext(AuthContext);
  // const[signUpModalStatus,setSignUpModalStatus] = useState(false);
  // const[loginModalStatus,setLoginModalStatus] = useState(false)
  const[navModalStatus,setNavModalStatus] = useState(false);
  const role = localStorage.getItem("role")
  const userId = localStorage.getItem("userId")
  const firstName = localStorage.getItem("firstName")
  const lastName = localStorage.getItem("lastName")


  const handleSignUp = () => {
    navigate("/signup");  
  }


  useEffect(()=>{
  const token = localStorage.getItem("token");
  if(token){
    setIsSignedIn(true);
  }else{
    setIsSignedIn(false);
  }
  },[]);

  useEffect(() => {
    if (navModalStatus) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [navModalStatus]);



  return (
    <>
    <header className='flex cursor-pointer justify-between items-center p-3 sm:p-6'>
      <div onClick={()=> navigate("/")} className='flex items-center gap-2'>
        <Stethoscope className="h-5 sm:h-8 w-5 sm:w-8 text-blue-600" />
        <p className='text-sm sm:text-1xl'>MedPlus</p>
      </div>
      {(isSignedIn) ? (
       <div className='bg-slate-300 rounded-full p-1'>
         <User2Icon onClick={()=> setNavModalStatus((prev)=> !prev)}/>
        </div>
      ):(
        <div className='flex gap-4'>
        <Button className="px-3 sm:px-5 py-1 sm:py-2 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 font-medium transition" onClick={()=> navigate("/login")} variant='outline'>Login</Button>
        <Button className="px-3 sm:px-5 py-1 sm:py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition" onClick={handleSignUp}>SignUp</Button>
      </div>
      )}
    </header>

 {/* Displaying UserIcon/navModal component based on userLogin status */}

    {(navModalStatus && (
      <div className='relative min-h-screen '>

        <div className='bg-white shadow-xl rounded-xl  md:w-[400px] absolute top-0 right-0 flex flex-col gap-4 py-8 px-3'>
          <div className='w-14 h-14 bg-blue-100 flex justify-center items-center rounded-full text-blue-600 text-xl font-bold shadow-sm'>
            <p>{firstName?.slice(0,1)}</p>
          </div>
          <div className='flex flex-col text-left'>
            <h2 className='font-semibold text-lg text-gray-800'>{`${firstName} ${lastName}`}</h2>
            <p className='text-sm text-gray-500'>{role=== "patient" ? "Patient" : "Doctor"}</p>
          </div>

          <div onClick={()=> setNavModalStatus(false)} className='bg-gray-100 hover:bg-gray-200 transition text-gray-600 rounded-full p-2 shadow-sm absolute top-3 right-3 cursor-pointer'>X</div>

           <div className='px-3 flex gap-4 mt-8 cursor-pointer'>
          <MessageCircle className='text-blue-600'/>
          <div onClick={()=> {
            setNavModalStatus(false);
             if(role === "patient") navigate("/feed");
             else navigate(`/inbox/${userId}`)
            }} className='flex flex-col'>
            <p className='font-medium text-gray-800'>{role=== "patient" ? "My Feed" : "Inbox"}</p>
            <p className='text-gray-500 text-sm'>{role=== "patient" ? "View your personalized feed" : "View latest messages"}</p>
          </div>
        </div>

        <div className='px-3 flex gap-4 mt-8 cursor-pointer'>
          <FileQuestionMark className='text-blue-600'/>
          <div onClick={()=> {
            setNavModalStatus(false);
            if(role === "patient") navigate("/myquestions");
            else navigate("/myanswers")
            }} className='flex flex-col'>
            <p className='font-medium text-gray-800'> {role=== "patient" ? "My Questions" : "My Answers"}</p>
            <p className='text-gray-500 text-sm'>{role=== "patient" ? "Track your asked questions" : "Track your answers"}</p>
          </div>
        </div>

        {/* {(role === "patient") &&
         <div className='px-3 flex gap-4 mt-8 cursor-pointer'>
          <Users className='text-blue-600'/>
          <div onClick={()=> {
            setNavModalStatus(false);
            navigate("/doctors");
            }}className='flex flex-col'>
            <p className='font-medium text-gray-800'>Explore Doctors</p>
            <p className='text-gray-500 text-sm'>Find medical specialists</p>
          </div>
          </div>} */}

        <div onClick={()=> {
            setNavModalStatus(false);
            setIsSignedIn(false);
            localStorage.clear();
            navigate("/");
            }}  className='p-3 flex gap-4 mt-8 rounded-lg bg-red-50 hover:border-1 border-red-600 transition cursor-pointer'>
          <LogOut className='text-red-600 '/>
          <div className='flex flex-col'>
            <p className='font-medium text-red-600'>Log Out</p>
            
          </div>
        </div>
        </div>

       
      </div>
    ))}
    
    </>
  )
}
