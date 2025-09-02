import React, { useState } from 'react'
import { Label } from './ui/label.jsx'
import axios from 'axios'
import { Input } from './ui/input.jsx'
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from './ui/select.jsx'
import { categories } from '../data/helper.js'
import { Button } from './ui/button.jsx'
import { useNavigate } from 'react-router-dom'
import { toast,Zoom } from 'react-toastify'

export const DoctorSignUp = () => {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    speciality:"",
    licenseNo:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const handleFormChange = (e)=> {
    setFormData((prev)=> {
      return {
        ...prev,
        [e.target.name]:e.target.value
      }
    })
  }

  // console.log(formData);
  




  const handleCreateAccount = async (e) => {
    e.preventDefault();
    let token;
    let userId;
    let role;
    let firstName;
    let lastName;

    try{
      toast.loading('Please wait...', {
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
      const response = await axios.post("https://med-quora.onrender.com/signup/doctor",formData);
      console.log(response);
      localStorage.clear();
      token = response.data.token;
      userId = response.data.userId;
      role = response.data.role;
      localStorage.setItem("token",token)
      localStorage.setItem("userId",userId);
      localStorage.setItem("role",role)
      localStorage.setItem("firstName",firstName)
      localStorage.setItem("lastName",lastName)
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
      navigate("/inbox");
    }
    catch(e){
      if(e.response.status === 409){
        alert("User already exists")
        navigate("/dr-login")
      }
      console.log(e);
    }

  }



  return (
    <div className='p-3 sm:p-6 flex flex-col justify-center items-center'>
      <div className='my-6 flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold text-blue-500 tracking-tight'>Join MedPortal</h1>
       <p className='text-gray-600 mt-1 text-lg'>Create your doctor account</p>
      </div>
      <div className='bg-white rounded-xl shadow-md sm:w-[500px] md:w-[700px]'>
        <div className='p-4 text-center'>
          <h2 className='text-2xl font-semibold text-gray-800'>Create Account</h2>
          <p className="text-gray-500 mt-2 text-sm">Fill in your professional details to get started</p>
        </div>
        <form className='p-2 sm:p-4'  onSubmit={handleCreateAccount} action="submit">
          <div className='flex flex-col sm:flex-row gap-4 mb-4'>
            <div className='flex flex-col gap-2'>
              <Label>First Name</Label>
              <Input onChange={handleFormChange} name="firstName" value={formData.firstName} type="text"/>
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Last Name</Label>
              <Input onChange={handleFormChange} name="lastName" value={formData.lastName} type="text"/>
            </div>
          </div>

          <div className='flex flex-col gap-4'>
             <div className='flex flex-col gap-2'>
              <Label>Email Address</Label>
              <Input onChange={handleFormChange} name="email" value={formData.email} type="email"/>
            </div>

             <div className='flex flex-col gap-2'>
              <Label>Medical Speciality</Label>
             <Select
               value={formData.speciality}
               onValueChange={(value) =>
               setFormData((prev) => ({ ...prev, speciality: value }))
               }
             >
                 <SelectTrigger className="">
                   <SelectValue placeholder="Select your speciality" />
                 </SelectTrigger>
                 <SelectContent>
                   {categories.map((category) => (
                     <SelectItem key={category.id} value={category.name}>
                       {category.name}
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
            </div>

             <div className='flex flex-col gap-2'>
              <Label>Medical License Number</Label>
              <Input onChange={handleFormChange} value={formData.licenseNo} name='licenseNo'  placeholder='Enter your medical license number' type="text"/>
            </div>

             <div className='flex flex-col gap-2'>
              <Label>Password</Label>
              <Input onChange={handleFormChange} name="password" value={formData.password} placeholder='Enter your password' type="password"/>
            </div>

             <div className='flex flex-col gap-2'>
              <Label>Confirm Password</Label>
              <Input onChange={handleFormChange} name="confirmPassword" value={formData.confirmPassword} placeholder='Confirm your password' type="password"/>
            </div>

            <Button className='text-white font-semibold bg-blue-500' type="submit">Create Account</Button>

            <p className=' text-center text-sm'>Already have an account <span onClick={()=> navigate("/dr-login")} className=' cursor-pointer text-sm text-blue-500 text-extrabold'>Login here</span></p>

          </div>
        </form>
      </div>
    </div>
  )
}
