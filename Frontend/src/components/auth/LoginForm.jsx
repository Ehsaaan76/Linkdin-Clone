import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./../../config/axios";
import { toast } from "react-hot-toast";
import { Loader } from 'lucide-react';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (data) => axiosInstance.post("/auth/login", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <form action="" onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full bg-gray-100"
        required
      />

      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full bg-gray-100"
        required
      />
      <button type="submit" className="w-full btn btn-primary">
        {isLoading ? <Loader className="size-5 animate-spin" /> : "Login" }
      </button>
    </form>
  );
};

export default LoginForm;
