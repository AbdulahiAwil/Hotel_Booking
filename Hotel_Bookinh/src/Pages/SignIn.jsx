import React from 'react'

function SignIn() {
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

          <form>
          <div className='mb-6'>
            <label className='block text-yellow-800 text-sm font-semibold mb-2' htmlFor="email">
              Email Address 
            </label>
            <input type="email" id="email"
            className='w-full px-4 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-700' 
            placeholder='Email'
          //   value={email}
          //   onChange={(e)=> setEmail(e.target.value)}
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
          //   value={email}
          //   onChange={(e)=> setEmail(e.target.value)}
            required
            />
          </div>
         
          </form>
          <button className='w-full bg-yellow-700 hover:bg-yellow-800 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 transition duration-200 disabled:cursor-not-allowed disabled:bg-orange-400'>Sign In</button>
       </div>
    </div>
  </div>
  )
}

export default SignIn