
import { inboxItems } from "../../data/helper.js";
import { Badge } from "../../components/ui/badge.jsx";
import { BarLoader } from "react-spinners";
import { InboxMessage } from '../../components/DoctorPortal/InboxMessage.jsx';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const  Inbox = () => {

  const doctorId = localStorage.getItem("userId");
  const[inboxQueries,setInboxQueries]=useState([])
  const[isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();

  const fetchInBoxQueries = async() => {
    try {
      setIsLoading(true)
      const response = await axios.get(`http://localhost:3000/doctors/inbox/${doctorId}`);
      console.log(response);
      setIsLoading(false)
      const queryArray = response.data.inboxQueries;
      setInboxQueries(queryArray)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  console.log(doctorId);
  fetchInBoxQueries(); 
  }, [])

  
  






  return (
    <>
    {isLoading ? isLoading && 
    <div className="w-full px-3 sm:px-6 my-4">
      <BarLoader width='100%' color='#2563EB'/>
      </div>:

    <div className="flex flex-col gap-4 p-3 sm:p-6">
      <h1 className="text-4xl font-extrabold text-blue-800 mt-6 drop-shadow-sm">Inbox</h1>

      {/* no of queries card */}
      <div className="flex flex-col gap-2">
        {inboxItems.map(({ id, count, label, icon: Icon, iconClasses }) => (
          <div key={id} className="bg-white p-5 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex gap-2 items-center">
              <Icon className={iconClasses} />
              <div className="flex flex-col">
                <p className="text-3xl font-extrabold text-gray-800">{count}</p>
                <p className="text-sm font-medium text-gray-500">{label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* patient queries card */}

      <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex flex-col gap-4">
        <div className="flex flex-col ">
          <h2 className="font-smeibold">Patient queries</h2>
          <p className="text-sm text-slate-300">Sorted by severity - Emergency queries appear first</p>
        </div>

        <div className="flex flex-col gap-2">
      {inboxQueries?.map((inboxQuery) => (
       <InboxMessage onClick={()=> navigate(`/query-reply/${inboxQuery._id}`)} key = {inboxQuery._id} inboxQuery={inboxQuery}/>
      ))}
        </div>
      </div>
    </div>
}
    </>
    
  );
}
