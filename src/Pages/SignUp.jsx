import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { signUp } from '../Lib/auth';
import { useAuth } from '../contex/AuthContex';

function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const authIfo = useAuth()
  console.log({authIfo})

  const navigate = useNavigate()
  const handleSubmit = async (event) =>{
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if(password !== confirmPassword){
      setError("Password do not match")
      setIsLoading(false);
      return
    }

    try {
        await signUp(email, password, username)
        setSuccess(true)

        setTimeout(() => {
          navigate("/signin");
        }, 3000);
  
        
      }catch (error) {
  
        console.error(error)
        setError(error.message || "Failed to create account. Please try again")
  
      }finally{
        setIsLoading(false)
      }

}

if (success) {


  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-800 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-yellow-800/10 text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-4">
            Your account has been created successfully. Please check your email for verification.
          </p>
          <p className="text-gray-500 text-sm">
            Redirecting to sign in page in a few seconds...
          </p>
        </div>
      </div>
    </div>
  )
}




  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute top-0 w-full h-full">
        <img src="https://i.pinimg.com/736x/39/a3/cd/39a3cdf125e5efc158083ee97edb3daa.jpg" alt="" className="object-cover w-full h-full" />
      </div>
      <div className="absolute w-full h-full bg-yellow-800/20"></div>
      <div className='absolute max-w-md w-full'>
        {/* Title and subtitle */}
        <div className='text-center items-center mb-10'> 
        <h1 className='text-3xl font-bold text-white'>Create an Account</h1>
        <p className='text-gray-600 mt-2'>Join our Admin Dashboard</p>
        </div>
         {/* Form info */}
         <div className='bg-white/70 rounded-lg shadow-md p-8'>
            {/* Form */}
            {
            error && (
              <div className='mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm'>
                {error}
              </div>
            )
          }
            <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label className='block text-yellow-800 text-sm font-semibold mb-2' htmlFor="email">
                Email Address 
              </label>
              <input type="email" id="email"
              className='w-full px-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700' 
              placeholder='Email'
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              required
              />
            </div>
            <div className='mb-6'>
              <label className='block text-yellow-800 text-sm font-semibold mb-2' htmlFor="email">
                Username 
              </label>
              <input type="username" id="username"
              className='w-full px-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700' 
              placeholder='Username'
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              required
              />
            </div>
            <div className='mb-6'>
              <label className='block text-yellow-800 text-sm font-semibold mb-2' htmlFor="email">
                Password 
              </label>
              <input type="password" id="password"
              className='w-full px-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700' 
              placeholder='Password'
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required
              />
            </div>
            <div className='mb-6'>
              <label className='block text-yellow-800 text-sm font-semibold mb-2' htmlFor="email">
                Confirm Password 
              </label>
              <input type="password" id="password"
              className='w-full px-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700' 
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
              required
              />
            </div>
            <button className='w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-400' disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
            </form>
            
         </div>
      </div>
    </div>
  );
}

export default SignUp