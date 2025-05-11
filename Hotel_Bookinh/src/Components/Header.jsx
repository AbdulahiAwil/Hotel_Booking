import React, { useEffect, useState } from 'react'
import LogoWhite from '../Images/logo-white.svg'
import LogoDark from '../Images/logo-dark.svg'
import { FaUserAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from 'react-router';
import { useAuth } from '../contex/AuthContex';

function Header() {
    const [header, setHeader] = useState(true)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, profile, logout } = useAuth()
    const avatar_url = profile.avatar_url

    console.log("user profile", profile)  


    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 50 ? setHeader(true) : setHeader(false)
        })
    }, [])
  return (
    <header
    className={`${header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8 '} fixed z-50 w-full transition-all duration-500`}
    >
        <div className='container mx-auto flex flex-row justify-between px-6 items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0'>
        {/* Left */}
        <div className='flex'>
            {/* Logo */}
            <div className='flex-shrink-0 flex items-center'>
            <a href="">
                {header ? (
                    <img className='w-[100px] lg:w-[160px]' src={LogoDark} />
                ) : (
                    <img className='w-[100px] lg:w-[160px]' src={LogoWhite} />
                )}
            </a>
            </div>
            {/* Navbar */}
            
                <nav className={`${header ? 'text-black' : 'text-white'} hidden sm:ml-40 sm:flex sm:space-x-8`}>
                    <Link to={"/"} className='hover:text-yellow-700 inline-flex px-1 pt-1 items-center border-b-2 border-transparent text-sm font-medium'>Home</Link>
                    <Link to={"/rooms"} className='hover:text-yellow-700 inline-flex px-1 pt-1 items-center border-b-2 border-transparent text-sm font-medium'>Rooms</Link>
                    <Link to={"/restaurant"} className='hover:text-yellow-700 inline-flex px-1 pt-1 items-center border-b-2 border-transparent text-sm font-medium'>Restaurant</Link>
                </nav>
        </div>
                {/* Right */}
        
        <div className={`${header ? 'text-black' : 'text-white'} flex space-x-8 items-center`}>
          {isLoggedIn ? (
            <>
            <div>
                <span  className="text-sm">
                    Hello, {profile?.username}
                </span>
            </div>
            <div className='relative'>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500" 
                onMouseEnter={() => setDropdownOpen(true)}
                >
                     {avatar_url ? (
                      <img className="w-8 h-8 rounded-full" src={avatar_url} />
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
                     
                      <button
                        onClick={() => logout()}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Signout
                      </button>
                    </div>
                  )}
            </div>
            
            </>

          ) 
          : (

            <div className="flex space-x-8 items-center">
                {/* Buttons */}
                <Link
                  to="signin"
                  className="inline-flex item-center justify-center px-4 py-2 border-none text-sm font-medium rounded-md text-white bg-yellow-700 hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-ofset-2 focus:ring-yellow-600"
                >
                  Booking
                </Link>
                {/* <Link
                  to="signup"
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md text-yellow-700 bg-white border-yellow-800 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-ofset-2 focus:ring-yellow-800"
                >
                  Sing Up
                </Link> */}
              </div>
            
          )}
            

        </div>
                 
        <div className={` ${header ? 'text-black' : 'text-white'} -mr-2 flex items-center sm:hidden`}>
            <button
              className="inline-flex items-center justify-center p-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <IoMdClose className="block w-6 h-6" />
              ) : (
                <CiMenuBurger className="block w-6 h-6" />
              )}
            </button>
          </div>

        </div>

        {isMenuOpen && (
          <div className='sm:hidden py-4'>
            <div>
            <div className={` ${header ? 'text-black bg-white/90 ' : 'text-white bg-yellow-700/80'} pt-2 pb-3 space-y-1`}>
            <Link
                to="/"
                className="block pl-3 pr-4 py-2 border-l-4 border-yellow-700 text-base font-medium"
              >
                Home
              </Link>
              <Link
                to="articles"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium hover:border-yellow-800/5 hover:text-gray-800"
              >
                Rooms
              </Link>
            </div>
            </div>
          </div>
        )}
    </header>
  )
}

export default Header