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
    const avatar_url = profile?.avatar_url

    // console.log("user profile", profil)  


    useEffect(()=>{
        window.addEventListener('scroll', ()=>{
            window.scrollY > 50 ? setHeader(true) : setHeader(false)
        })
    }, [])
  return (
   <header
  className={`${
    header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'
  } fixed z-50 w-full transition-all duration-500`}
>
  <div className="container mx-auto flex items-center justify-between flex-wrap px-4 sm:px-6 lg:px-8">
    {/* Left: Logo + Navbar */}
    <div className="flex items-center justify-between w-full lg:w-auto">
      {/* Logo */}
      <a href="/" className="flex-shrink-0">
        <img
          src={header ? LogoDark : LogoWhite}
          alt="Logo"
          className="w-[100px] sm:w-[120px] lg:w-[160px]"
        />
      </a>

      {/* Hamburger for mobile */}
      <div className={`sm:hidden ${header ? 'text-black' : 'text-white'}`}>
        <button
          className="p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <IoMdClose className="w-6 h-6" />
          ) : (
            <CiMenuBurger className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>

    {/* Navbar for large screens */}
    <nav
      className={`${
        header ? 'text-black' : 'text-white'
      } hidden sm:flex space-x-6 lg:space-x-10`}
    >
      <Link to="/" className="hover:text-yellow-700 text-sm font-medium">
        Home
      </Link>
      <Link to="/room" className="hover:text-yellow-700 text-sm font-medium">
        Rooms
      </Link>
      <Link
        to="/restaurant"
        className="hover:text-yellow-700 text-sm font-medium"
      >
        Restaurant
      </Link>
      <Link
        to="/about"
        className="hover:text-yellow-700 text-sm font-medium"
      >
        About Us
      </Link>
      <Link
        to="/contact"
        className="hover:text-yellow-700 text-sm font-medium"
      >
        Contact Us
      </Link>
    </nav>

    {/* Right: Avatar or Login */}
    <div
      className={`${
        header ? 'text-black' : 'text-white'
      } hidden sm:flex items-center space-x-6`}
    >
      {isLoggedIn && (
        <div className="relative">
          <button
            onMouseEnter={() => setDropdownOpen(true)}
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
          >
            {avatar_url ? (
              <img src={avatar_url} alt="avatar" className="rounded-full" />
            ) : (
              <FaUserAlt className="text-gray-600" />
            )}
          </button>
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Hello, {profile?.username}
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <div
      className={`sm:hidden pt-4 ${
        header ? 'bg-white text-black' : 'bg-yellow-700/90 text-white'
      }`}
    >
      <div className="space-y-2 px-4 pb-4">
        <Link to="/" className="block py-2 border-b border-gray-200">
          Home
        </Link>
        <Link to="/room" className="block py-2 border-b border-gray-200">
          Rooms
        </Link>
        <Link to="/restaurant" className="block py-2 border-b border-gray-200">
          Restaurant
        </Link>
        <Link to="/about" className="block py-2 border-b border-gray-200">
          About Us
        </Link>
        <Link to="/contact" className="block py-2 border-b border-gray-200">
          Contact Us
        </Link>

        {isLoggedIn && (
           <Link to="/dashboard" className="block py-2 border-b border-gray-200">
            Admin Dashboard
        </Link>
        )}
      </div>
    </div>
  )}
</header>

  )
}

export default Header