import React from 'react'
import Sidebar from '../components/Sidebar';
import Post from '../components/Post';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../config/axios';

const PostPage = () => {

    const { postId } = useParams();

    const { data: authUser, isLoading: authUserLoading } = useQuery({
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

  if (authUserLoading) return null;

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => axiosInstance.get(`/posts/${postId}`),
  });

  if(postLoading) return <div>Loading post...</div>
  if(!post?.data) return <div>Post not found</div>

  return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

			<div className='col-span-1 lg:col-span-3'>
				<Post post={post.data} />
			</div>
		</div>
	);
};
export default PostPage;