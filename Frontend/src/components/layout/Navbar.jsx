import React from "react"
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './../../config/axios';

function Navbar() {

  const {data: authUser} = useQuery({queryKey: ["authUser"],})

  const {data: notifications} = useQuery({
    queryKey: ["notifications"],
    queryFn: async() => {
      const  res = await axiosInstance.get("/notifications");
      if(!res){
        toast.error("No Notifications")
      }
      enabled: !!authUser;
    }
  })

  const {data: connectionRequests} = useQuery({
    queryKey: [connectionRequests],
    queryFn: async() => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  })

  console.log("Notifications: ", notifications);
  console.log("Connection requests: ", connectionRequests);

  return (
    <div>Navbar</div>
  )
}

export default Navbar