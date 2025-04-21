import React from 'react'
import { Link } from 'react-router'
import LogoWhite from '../Images/logo-white.svg'

function Footer() {
  return (
   
    <footer className='bg-black py-12'>
      <div className='container mx-auto text-gray-400 flex justify-between'>
        <Link to={"/"}>
        <img src={LogoWhite} alt="" className='w-[100px] lg:w-[160px]'/>
        </Link>
        Copyright &copy; 2025. all rights reserved.
      </div>

    </footer>
  )
}

export default Footer