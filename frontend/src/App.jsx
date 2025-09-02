import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {AppLayout} from './layouts/AppLayout'
import{LandingPage} from './pages/LandingPage'
import{FeedPage} from './pages/FeedPage'
import{MyQuestionsPage} from './pages/MyQuestionsPage'
import{QuestionPage} from './pages/QuestionPage'
import{ExploreDoctorsPage} from './pages/ExploreDoctorsPage'
import{Specialization} from './pages/Specialization'
import{DoctorProfilePage} from './pages/DoctorProfilePage'
import './App.css'
import { SignUp } from './components/SignUp'
import { Login } from './components/Login'
import { DoctorSignUp } from './components/DoctorSignUp'
import { DoctorLogin } from './components/DoctorLogin'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Inbox } from './pages/DoctorPortal/Inbox'
import { MyAnswers } from './pages/DoctorPortal/MyAnswers'
import { QueryReply } from './pages/DoctorPortal/QueryReply'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { createContext, useState } from 'react'



export const AuthContext = createContext();
function App() {

  const queryClient = new QueryClient();
  

  const[isSignedIn,setIsSignedIn] = useState(false);

  const router = createBrowserRouter([{
    element:<AppLayout/>,
    children:[{
      element:<LandingPage/>,
      path:"/"
    },{
      element:<SignUp/>,
      path:"/signup"
    },{
      element:<DoctorSignUp/>,
      path:"/dr-signup"
    },{
      element:<DoctorLogin/>,
      path:"/dr-login"
    },{
      element:<Login/>,
      path:"/login"
    },{
      element:<ProtectedRoute><FeedPage/></ProtectedRoute>,
      path:"/feed"
    },{
      element:<Inbox/>,
      path:"/inbox/:doctorId"
    },{
      element:<MyAnswers/>,
      path:"/myanswers"
    },{
      element:<QueryReply/>,
      path:"/query-reply/:queryId"
    },{
      element:<ProtectedRoute><MyQuestionsPage/></ProtectedRoute>,
      path:"/myquestions"
    },{
      element:<ProtectedRoute><QuestionPage/></ProtectedRoute>,
      path:"/question/:queryId"
    },{
      element:<ProtectedRoute><ExploreDoctorsPage/></ProtectedRoute>,
      path:"/doctors",
    },{
        element:<ProtectedRoute><Specialization/></ProtectedRoute>,
        path:"specializations"
      },{
      element:<ProtectedRoute><DoctorProfilePage/></ProtectedRoute>,
      path:"/doctors/:doctorId"
    }]
  }])
  return (
    <>
    
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{isSignedIn,setIsSignedIn}}>
      <RouterProvider router={router}/>
    </AuthContext.Provider>
    </QueryClientProvider>
     
    </>
  )
}

export default App
