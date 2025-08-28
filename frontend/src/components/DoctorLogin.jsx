import React, { useContext, useState } from 'react'
import { Label } from './ui/label.jsx'
import { Input } from './ui/input.jsx'
import { Button } from './ui/button'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App.jsx'

export const DoctorLogin = () => {

    const navigate = useNavigate();
    const {setIsSignedIn} = useContext(AuthContext)
    const[invalidPassword,setInvalidPassword] = useState(false)
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

    const handleFormChange = (e) => {
        setFormData((prev)=> {
            return{
                ...prev,
                [e.target.name]:e.target.value,

            }
        })

        console.log(formData);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let token;
        let userId;
        let role;
        let firstName;
        let lastName;

        try {
             const response = await axios.post("http://localhost:3000/login/doctor",formData);
             console.log(response.data);
             localStorage.clear();
             token = response.data.token;
             userId = response.data.userId;
             role = response.data.role;
             firstName = response?.data.firstName;
             lastName = response?.data.lastName;
             localStorage.setItem("token",token)
             localStorage.setItem("userId",userId);
             localStorage.setItem("role",role)
             localStorage.setItem("firstName",firstName)
             localStorage.setItem("lastName",lastName)
             console.log(localStorage)
             setInvalidPassword(false)
             setIsSignedIn(true);
             navigate(`/inbox/${userId}`)
        }
        catch(e){
            if(e.response.status === 401){
                setInvalidPassword(true);
                return;
            }
            if(e.response.data.loginStatus===false){
                alert("User not found");
                navigate("/dr-signup")
            }
            console.log(e);
        }
    }
  return (
    <div className='flex flex-col justify-center items-center p-3 sm:p-6'>
          <div className='my-6 flex flex-col justify-center items-center'>
            <h1 className="text-3xl font-bold text-blue-500 tracking-tight">Welcome Back</h1>
            <p className="text-gray-600 mt-1 text-lg">Log in to your doctor account</p>
         </div>

         <form onSubmit={handleSubmit} className=' bg-white rounded-xl shadow-md sm:w-[400px] flex flex-col gap-1'>
            <div className='p-4 text-center'>
              <h2 className="text-lg font-semibold text-gray-800">Login Account</h2>
              <p className="text-gray-500 mt-2 text-sm">Enter your credentials to access your medical portal</p>
            </div>

             <div className='flex flex-col gap-2 px-4'>
              <Label>Email Address</Label>
              <Input onChange={handleFormChange} name="email" value={formData.email} type="email"/>
            </div>

            <div className="p-4">
                 <Label className={invalidPassword ? "text-red-500" : "text-gray-700"}>
                  {invalidPassword ? "Invalid Password" : "Password"}
                </Label>
                <Input
                 type="password"
                 value={formData.password}
                 name='password'
                 onChange={handleFormChange}
                 className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none 
                     ${invalidPassword 
                     ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                     : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                   />
                  {invalidPassword && (
                  <p className="text-sm text-red-500 mt-1">Please enter the correct password.</p>
                 )}
             </div>

            <Button className=' mx-4 cursor-pointer text-white bg-blue-500' type="submit">Login </Button>

             <p className=' my-3 text-center text-sm'>Don't have an account? <span onClick={()=> navigate("/dr-signup")} className=' cursor-pointer text-sm text-blue-500 text-extrabold'>Sign-up here</span></p>


        </form>
    </div>
  )
}
