import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'
import { useContext } from 'react'
import { toast,Zoom } from 'react-toastify'


export const SignUp = () => {
  

  const[formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    age:"",
    sex:"",
    phoneNum:"",
    email:"",
    password:""
  })


  const handleFormChange = (e)=> {
    setFormData((prev)=> {
      return{
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  const navigate = useNavigate();
  const{setIsSignedIn} = useContext(AuthContext)
 


  const handleSignUp = async (e) => {
    e.preventDefault()
    
    let token;
    let userId;
    let role;
    let firstName;
    let lastName;
    let toastStatus;
    
    try{
     toastStatus = toast.loading('Please wait...', {
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
    const response = await axios.post("https://med-quora.onrender.com/signup/patient/", formData);
    toast.dismiss(toastStatus);
    // console.log(response)
    localStorage.clear();
    token = response.data.token;
    userId = response.data.userId;
    role = response.data.role;
    firstName=response.data.firstName;
    lastName=response.data.lastName;
    localStorage.setItem("token",token)
    localStorage.setItem("userId",userId);
    localStorage.setItem("role",role)
    localStorage.setItem("firstName",firstName)
    localStorage.setItem("lastName",lastName)
    console.log(localStorage);
    
    setIsSignedIn(true);
    toast.success('Sign up successful!', {
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
      toast.dismiss(toastStatus);
      if(error.response && error.response.status === 409){
        alert("User already exist");
        navigate("/login")
      }
      console.log(error);
    }
  }
  return (

    <div className=' flex justify-center items-center min-h-screen mx-0'>
      <form onSubmit={handleSignUp} className='p-4 sm:p-8 w-[90%] sm:w-[500px] flex flex-col text-left gap-2 bg-white rounded-2xl shadow-md border border-gray-200'>
        <h2 className='text-2xl font-bold text-slate-900 text-center mt-2'>Sign Up</h2>
        <p class="text-sm text-gray-500 text-center mb-3">Create your account to get started</p>
        <Label>First Name:</Label>
        <Input type='text' name='firstName' value={formData.firstName} onChange={handleFormChange} />
        <Label>Last Name:</Label>
        <Input type='text' name='lastName' value={formData.lastName} onChange={handleFormChange} />
        <Label>Age:</Label>
        <Input type='number' name='age' value={formData.age} onChange={handleFormChange} />
        <Label>Sex:</Label>
        <Input type='text' name='sex' value={formData.sex} onChange={handleFormChange} />
        <Label>Mobile number:</Label>
        <Input type='text' name='phoneNum' value={formData.phoneNum} onChange={handleFormChange} />
        <Label>Email address</Label>
        <Input type='email' name='email' value={formData.email}  onChange={handleFormChange} />
        <Label>Password</Label>
        <Input type='password' name='password' value={formData.password}  onChange={handleFormChange} />
        <div className='flex flex-col'>
          <Button type='submit' onClick={handleSignUp} className='mt-4 px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700 transition'>Sign In</Button>
          <Button type='button' onClick={()=> navigate("/")} className='mt-4 px-5 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-300 font-medium hover:bg-gray-200 transition'>Cancel</Button>
        </div>
        <p onClick={() => navigate("/login")} className='text-sm text-gray-500 text-center'>Already have an account? 
          <span className='text-blue-600 hover:underline font-medium ml-1'>Login here</span>
          </p>
    </form>
    </div>
    
  )
}
