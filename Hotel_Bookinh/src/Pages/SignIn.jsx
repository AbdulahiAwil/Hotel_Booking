import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { signIn } from '../Lib/auth'
function SignIn() {

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [success, setSuccess] = useState(false)



  // const authIfo = useAuth()
  // console.log({ authIfo })

  const navigate = useNavigate()

  const handleSubmit = async (event) => {

    event.preventDefault();

    setIsLoading(true)
    setError(null)

    
    try {

      await signIn(email, password);

      navigate('/')

    } catch (error) {
      setError(error.message || "Failed to sign in . Please check your credentials.")
      console.log("error", error)
    } finally {
      setIsLoading(false)
    }
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
      <h1 className='text-3xl font-bold text-white'>Welcome Back</h1>
      <p className='text-gray-600 mt-2'>Sing in to access your account</p>
      </div>
       {/* Form info */}
       <div className='bg-white/70 rounded-lg shadow-md p-8'>
          {/* Form */}

          <form  onSubmit={handleSubmit}>
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
          <button className='w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-400' disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sing In'}
          </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-yellow-800 hover:text-yellow-950 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
       </div>
    </div>
  </div>
  )
}

export default SignIn