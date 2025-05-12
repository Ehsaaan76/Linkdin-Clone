import React, { useState } from 'react'

function LoginForm() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

  }

  return (
    <form action="" onSubmit={handleLogin} className='flex flex-col gap-4'>
      <input type="text" 
      placeholder='Username'
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className='input input-bordered w-full bg-gray-100'
      required/>

      <input type="text" 
      placeholder='Password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className='input input-bordered w-full bg-gray-100'
      required
      />
      <button>Login</button>
    </form>
  )
}

export default LoginForm