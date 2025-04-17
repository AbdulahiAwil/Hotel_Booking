import React, { useEffect, useState } from 'react'
import LogoWhite from '../Images/logo-white.svg'
import LogoDark from '../Images/logo-dark.svg'
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router';

function Header() {
    const [header, setHeader] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const avater_url = null

    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 50 ? setHeader(true) : setHeader(false)
        })
    }, [])
  return (
    <header
    className={`${header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8 '} fixed z-50 w-full transition-all duration-500`}
    >
        <div className='container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0'>
        {/* Left */}
        <div className='flex'>
            {/* Logo */}
            <div className='flex-shrink-0 flex items-center'>
            <a href="">
                {header ? (
                    <img className='w-[160px]' src={LogoDark} />
                ) : (
                    <img className='w-[160px]' src={LogoWhite} />
                )}
            </a>
            </div>
            {/* Navbar */}
            
                <nav className={`${header ? 'text-black' : 'text-white'} hidden sm:ml-40 sm:flex sm:space-x-8`}>
                    <a href="" className='hover:text-yellow-700 inline-flex px-1 pt-1 items-center border-b-2 border-transparent text-sm font-medium'>Home</a>
                    <a href="" className='hover:text-yellow-700 inline-flex px-1 pt-1 items-center border-b-2 border-transparent text-sm font-medium'>Home</a>
                    <a href="" className='hover:text-yellow-700 inline-flex px-1 pt-1 items-center border-b-2 border-transparent text-sm font-medium'>Home</a>
                </nav>
        </div>

        <div className='flex space-x-8 items-center'>
            <div>
                <span  className="text-gray-700 text-sm">
                    Hello, Abdallah
                </span>
            </div>
            <div className='relative'>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500" 
                onMouseEnter={() => setDropdownOpen(true)}
                >
                     {avater_url ? (
                      <img className="w-8 h-8 rounded-full " src={avater_url} />
                    ) : (
                      <FaUserAlt className="text-gray-600" />
                    )}
                </button>
                {dropdownOpen && (
                    <div
                      className="absolute right-0 w-48 bg-white mt-1 rounded-md shadow-lg z-10"
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <div></div>
                      <Link
                        to={"profile"}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                      <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Manage Articles
                      </Link>
                      <button
                        // onClick={() => logout()}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Signout
                      </button>
                    </div>
                  )}
            </div>

        </div>

        </div>
    </header>
  )
}

export default Header