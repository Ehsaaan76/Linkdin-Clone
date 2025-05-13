import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { axiosInstance } from '../config/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from 'lucide-react';

const Post = ({post}) => {

    const queryClient = useQueryClient();

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

  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const isOwner = authUser._id === post.author._id;
  const isLiked = post.likes?.includes(authUser._id);

  const { mutate: deletePostMutation, isPending: isDeletingPost} = useMutation({
    mutationFn: async() => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong")
    }
  })

  const { mutate: createCommentMutation, isPending: isAddingComment } = useMutation({
    mutationFn: async(newComment) => {
      await axiosInstance.post(`/posts/${post._id}/comment`, {content: newComment})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong" );
    },
  });

  const { mutate: likePostMutation, isPending: isLikingPost } = useMutation({
    mutationFn: async() => {
      await axiosInstance.post(`/posts/${post._id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ mutate: ["posts"] });
    },
    onError: (error) => {
      toast.error("Something went wrong")
    }
  })

  const handleLikePost = () => {
    if(isLikingPost) return;
    likePostMutation();
  }

  const handleDeletePost = () => {
    if(!window.confirm("Are you sure you want to delete this post?")) return;
    deletePostMutation();
  }

  // const handleAddComment = () => {

  // }

  

return (
		<div className='bg-white rounded-lg shadow mb-4'>
			<div className='p-4'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center'>
						<Link to={`/profile/${post?.author?.username}`}>
							<img
								src={post.author.profilePicture || "/avatar.png"}
								alt={post.author.name}
								className='size-10 rounded-full mr-3'
							/>
						</Link>

					</div>
					{isOwner && (
						<button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
							{isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
						</button>
					)}
				</div>

	
			</div>

		</div>
	);
};
export default Post;