import {useContext, useState} from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../App.jsx'
import { toast,Zoom } from 'react-toastify'


export const Login = () => {

    const[invalidPassword,setInvalidPassword] = useState(false);
    const navigate = useNavigate();
    const{setIsSignedIn} = useContext(AuthContext)

    const[formData,setFormData] = useState({
        email:"",
        password:""
      })
    
    
      const handleFomChange = (e)=> {
        setFormData((prev)=> {
          return{
            ...prev,
            [e.target.name]:e.target.value
          }
        })
      }




    const handleLogin = async (e) => {
      e.preventDefault();
    
      let token;
      let userId;
      let role;
      let firstName;
      let lastName;
        try{
            const toastStatus=  toast.loading('Please wait...', {
                           position: "top-center",
                           autoClose: 2000,
                           hideProgressBar: false,
                           closeOnClick: false,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                           theme: "light",
                           transition: Zoom,
                           });
             const response = await axios.post("https://med-quora.onrender.com/login/patient/",formData);
             toast.dismiss(toastStatus);
            //  console.log(response);
             localStorage.clear();
             token = response?.data.token;
             userId = response?.data.userId;
             role = response?.data.role;
             firstName = response?.data.firstName;
             lastName = response?.data.lastName;
             localStorage.setItem("token",token)
             localStorage.setItem("userId",userId);
             localStorage.setItem("role",role)
             localStorage.setItem("firstName",firstName)
             localStorage.setItem("lastName",lastName)
             setIsSignedIn(true);

             toast.success('Login successful!', {
                           position: "top-center",
                           autoClose: 2000,
                           hideProgressBar: false,
                           closeOnClick: false,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                           theme: "light",
                           transition: Zoom,
                           });
             navigate("/feed");
            
        }
         catch(error){
            if(error.response.status === 404){
                toast.error('Please sign in first', {
                           position: "top-center",
                           autoClose: 2000,
                           hideProgressBar: false,
                           closeOnClick: false,
                           pauseOnHover: true,
                           draggable: true,
                           progress: undefined,
                           theme: "light",
                           transition: Zoom,
                           });
                navigate("/signup");
                return;
            }
            if(error.response.status === 401){
                setInvalidPassword(true);
                return;
            }
        console.log(error);    
    }
    }



  return (
    <div className=' flex justify-center items-center min-h-screen'>
        <form onSubmit={handleLogin} className='p-3 sm:p-6 w-[90%] sm:w-[500px] flex flex-col text-left gap-3 bg-white rounded-2xl shadow-md border border-gray-200 '>
        <h2 className='text-2xl font-bold text-slate-900 text-center mt-2'>Login</h2>
        <p className="text-sm text-gray-500 text-center mb-4">Welcome back! Please enter your details.</p>
        <Label>Email address</Label>
        <Input className="w-full border border-gray-300 rounded-xl px-4 py-2 text-slate-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
         type='email' name='email' value={formData.email}  onChange={handleFomChange} />
    <div className="mb-4">
       <Label className={invalidPassword ? "text-red-500" : "text-gray-700"}>
        {invalidPassword ? "Invalid Password" : "Password"}
      </Label>
      <Input
       type="password"
       value={formData.password}
       name='password'
       onChange={handleFomChange}
       className={`mt-1 block w-full px-3 py-2 rounded-xl shadow-sm focus:outline-none 
           ${invalidPassword 
           ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
           : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            }`}
         />
        {invalidPassword && (
          <p className="text-sm text-red-500 mt-1">Please enter the correct password.</p>
        )}
    </div>
        <div className='flex flex-col gap-4'>
        <Button type='submit'className='px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition'>Login</Button>
        <Button type='button' onClick={()=> navigate("/")} className='px-5 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-300 font-medium hover:bg-gray-200 transition'>Cancel</Button>
        </div>
        <p onClick={() => navigate("/signup")} className='text-sm text-gray-500 text-center'>Dont have an account? 
          <span className='text-blue-600 hover:underline font-medium ml-1'>Signup here</span>
          </p>
    </form>
    </div>
    
  )
}
