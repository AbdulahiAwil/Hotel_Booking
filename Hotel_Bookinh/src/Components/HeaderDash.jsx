
import React, { useState } from 'react'
import LogoWhite from '../Images/logo-white.svg'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router'
import { useAuth } from '../contex/AuthContex'
import { IoMdClose } from 'react-icons/io'
import { CiMenuBurger } from 'react-icons/ci'

function HeaderDash() {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(true);
    const { isLoggedIn, profile } = useAuth()
        // console.log("user profile", profile)

    const avatar_url = null
  return (
    <div className="relative min-h-screen bg-gray-200">
    <div className='absolute z-50'>
      <nav className="fixed w-full bg-white lg:py-4">
        <div className="flex flex-row justify-between px-6 items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          <div className="flex justify-center items-center space-x-5">
            <img className="lg:w-[160px]" src={LogoWhite} alt="" />
            <button
              className="inline-flex items-center justify-center p-2 rounded-md  bg-yellow-700 font-medium text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <IoMdClose className="block w-6 h-6 font-semibold" />
              ) : (
                <CiMenuBurger className="block w-6 h-6" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-5">
            {isLoggedIn && (
              <>
                <div>
                  <span className="text-sm text-yellow-700 hover:text-yellow-900">
                    Hello, Abdalla
                  </span>
                </div>
                <div className="relative">
                  <button
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    onMouseEnter={() => setDropdownOpen(true)}
                  >
                    {avatar_url ? (
                      <img className="w-8 h-8 rounded-full " src={avatar_url} />
                    ) : (
                      <FaUserAlt className="text-yellow-700 hover:text-yellow-800" />
                    )}
                  </button>
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 w-48 bg-white mt-1 rounded-md shadow-lg z-10 "
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
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
      <div className=''>
      {isMenuOpen && (
        <div className="relative min-h-screen w-[200px] bg-yellow-900">
          <nav className="absolute top-14 flex flex-col items-center p-4 space-y-2">
            <Link
              to="/"
              className="text-gray-100 hover:bg-gray-200 rounded px- py-2 "
            >
              Dashboard
            </Link>
            <Link
              to="/customer"
              className="text-gray-700 hover:bg-gray-200 rounded px-3 py-2"
            >
              Customer
            </Link>
            {/* <Link to="/settings" className="text-gray-700 hover:bg-gray-200 rounded px-3 py-2">Settings</Link> */}
          </nav>
        </div>
      )}
      </div>
    </div>
  );
}

export default HeaderDash