import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-gray-800 py-4 px-6 flex items-center justify-between fixed w-full z-10">
      <div className="flex items-center">
        <div>
          <Link
            to="/"
            className="text-white hover:bg-gray-600 px-2 py-1 rounded"
          >
            Home
          </Link>
        </div>
        <button
          onClick={toggleMenu}
          className="lg:hidden ml-auto text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 6H16V8H4V6ZM4 11H16V13H4V11ZM4 16H16V18H4V16Z"
                fill="white"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 6H17V7H3V6ZM3 11H17V12H3V11ZM3 16H17V17H3V16Z"
                fill="white"
              />
            )}
          </svg>
        </button>
      </div>

      <ul
        className={`${
          isMenuOpen
            ? 'flex flex-col lg:flex-row lg:items-center'
            : 'hidden lg:flex'
        } lg:flex flex-col lg:flex-row lg:items-center`}
      >
        <li className="lg:mr-4">
          <Link
            to="/about"
            className="text-white hover:bg-gray-600 px-2 py-1 rounded block lg:inline"
          >
            About
          </Link>
        </li>
        <li className="lg:mr-4">
          <Link
            to="/services"
            className="text-white hover:bg-gray-600 px-2 py-1 rounded block lg:inline"
          >
            Services
          </Link>
        </li>
        <li className="lg:mr-4">
          <Link
            to="/contact"
            className="text-white hover:bg-gray-600 px-2 py-1 rounded block lg:inline"
          >
            Contact
          </Link>
        </li>
      </ul>

      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="px-2 py-1 rounded bg-gray-700 text-white focus:outline-none mr-4"
        />
        <Link to="/Cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            fill="white"
            className="mr-4 cursor-pointer"
          >
            <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
          </svg>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
