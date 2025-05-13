import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { axiosInstance } from '../config/axios'
import Sidebar from '../components/Sidebar';
import PostCreation from '../components/PostCreation';

function HomePage() {

 const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;  
      } catch (err) {
        if (err.response && err.response.status === 401) {
          return null;
        }
        toast.error(err.response.data.message || "Something went wrong");
      }
    },
  });
  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async() => {
        const res = await axiosInstance.get("/users/suggestions");
        return res.data;
    }
  })

    const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async() => {
        const res = await axiosInstance.get("/posts");
        return res.data;
    }
  })


  return (
    <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

      <div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
        <PostCreation user={authUser} />
      </div>
      

    </div>
  )
}

export default HomePage