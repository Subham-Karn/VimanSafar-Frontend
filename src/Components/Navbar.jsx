import React, { useState } from 'react';
import { logo } from '../assets/assets';
import { Link } from 'react-router-dom';
import { navLink } from '../util/consts';
import { ChevronDown, Phone, User, LogOut, Settings, Menu, X, UserRoundPlus, LogIn } from 'lucide-react';
import { IoTicketOutline } from "react-icons/io5";
import { useTravel } from '../hooks/useHook';
const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isOpen , setIsOnOpen] = useState(false);
  const {setNavName , navName} = useTravel();
  const auth = false;
  console.log(navName);
  
  return (
    <header className="bg-white  relative z-50">
      <div className="max-w-7xl mx-auto px-4  flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="logo" className="h-12 object-contain" />
          <div className="leading-tight flex items-center space-x-0.5">
            <h2 className=" text-2xl md:text-2xl uppercase font-bold text-gray-700">Vimaan</h2>
            <h2 className=" text-lg md:text-2xl  text-[#d72f18] tracking-widest">Safar</h2><sup>TM</sup>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center">
          {navLink.slice(1).map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setNavName(link.name)}
              className={`relative group text-gray-600 uppercase tracking-widest leading-tight flex flex-col items-center px-4 py-3 transition duration-300 
                ${navName === link.name ? 'bg-[#d72f18]/10 text-[#d72f18]' : 'hover:bg-[#d72f18]/10'}
              `}
            >
              {/* Icon */}
              <span className="mb-1">{link.icon}</span>
              {/* Name */}
              <span className="text-sm font-medium">{link.name}</span>

              {/* Underline Animation */}
              <span
                className={`absolute bottom-0 h-0.5 bg-[#d72f18] transition-all duration-300 ease-in-out
                  ${navName === link.name ? 'w-full left-0' : 'w-0 left-1/2 group-hover:w-full group-hover:left-0'}
                `}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Auth / Contact Section */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex flex-col items-end">
            <span className="text-xs px-2 py-1 rounded text-white bg-green-600">LIVE ASSISTANCE</span>
            <span className="flex items-center space-x-1">
              <Phone className="text-[#d72f18]" size={18} />
              <span className="text-sm font-semibold text-[#d72f18]">+91-933-933-933</span>
            </span>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-1"
              onClick={() => setIsClicked((prev) => !prev)}
            >
              <div className="p-2 rounded-full bg-[#d72f18] text-white">
                <User size={24} />
              </div>
              <ChevronDown size={18} />
            </button>

            {/* Dropdown Menu */}
            {isClicked && (
              <div className="absolute right-0 mt-2 w-70 bg-white rounded-md shadow-md z-50">
                {auth && (
                    <div className='flex items-center space-x-2 p-2 border-b border-b-gray-200'>
                        <div className="p-2 rounded-full bg-[#d72f18] text-white">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700">Guest</h3>
                            <p className="text-xs text-gray-500">guest123@gmail.com</p>
                        </div>
                    </div>
                )}
                <ul className="py-1 text-sm text-gray-700 ">
                {auth && (
                 <li>
                    <Link
                      to="/mybooking"
                      className="flex items-center p-4  border-b border-b-gray-200 hover:bg-gray-100"
                    >
                      <IoTicketOutline size={16} className="mr-2" /> My Bookings
                    </Link>
                  </li>
                )}
                 {auth && <li>
                    <Link
                      to="/profile"
                      className="flex items-center p-4  border-b border-b-gray-200 hover:bg-gray-100"
                    >
                      <User size={16} className="mr-2" /> Profile
                    </Link>
                  </li> 
                  }
                {!auth && <li>
                    <Link
                      to="/profile"
                      className="flex items-center p-4  border-b border-b-gray-200 hover:bg-gray-100"
                    >
                      <LogIn size={16} className="mr-2" /> Login
                    </Link>
                  </li> 
                  }
                {!auth && <li>
                    <Link
                      to="/profile"
                      className="flex items-center p-4  border-b border-b-gray-200 hover:bg-gray-100"
                    >
                      <UserRoundPlus size={16} className="mr-2" /> Sign Up
                    </Link>
                  </li> 
                  }
                  <li>
                    <Link
                      to="/settings"
                      className="flex items-center p-4 border-b border-b-gray-200 hover:bg-gray-100"
                    >
                      <Settings size={16} className="mr-2" /> Settings
                    </Link>
                  </li>
                 {auth && <li>
                    <Link
                      to="/logout"
                      className="flex items-center p-4 border-b border-b-gray-200 text-red-600 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="mr-2" /> Logout
                    </Link>
                  </li>
                }
                </ul>
              </div>
            )}
          </div>
        </div>
        <div onClick={() => setIsOnOpen(true)} className='md:hidden block'>
          <Menu size={24} />
        </div>
        <div
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-md z-50 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="p-4 ">
         <span onClick={() => setIsOnOpen(false)} className='absolute top-4 right-4 text-red-500'>
            <X size={24}  />
         </span>
          <div className='flex flex-col items-start gap-4 relative top-2'>
           {!auth ? (
               <div className='flex items-center py-2'>
                    <div className="p-4 rounded-full bg-[#d72f18] text-white">
                        <User size={24} />
                    </div>
                    <div className='ml-4'>
                        <h3 className='text-lg font-semibold'>Guest</h3>
                        <p className='text-sm text-gray-600'>guest123@gmail.com</p>
                    </div>
               </div> 
           ): (
               <div className='flex items-center py-2'>
                    <div className="p-4 rounded-full bg-[#d72f18] text-white">
                        <User size={24} />
                    </div>
                    <div className='ml-4'>
                        <h3 className='text-lg font-semibold'>Guest</h3>
                        <p className='text-sm text-gray-600'>guest123@gmail.com</p>
                    </div>
               </div>
           )}
            <ul className="space-y-4">
              {navLink.slice(0, navLink.length).map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-600 flex space-x-4 uppercase tracking-widest items-center  hover:bg-[#d72f18]/10 hover:text-black/50 w-full px-2 py-2 rounded"
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </ul>
           {!auth ? <div className='flex flex-col space-y-3 mt-5'>
                <button className='bg-[#d72f18] text-white uppercase px-20 py-2 rounded'>Login</button>
                <button className='ring-2 ring-[#d72f18]/60 uppercase text-[#d72f18] px-20 py-2 rounded'>Sign Up</button>
            </div>
            : <div>
                <button className='bg-[#d72f18] text-white uppercase px-20 py-2 rounded'>Logout</button>
            </div>
           }
            <div className='flex flex-col space-y-2 mt-5 text-gray-600 '>
                <p className='hover:underline'>Privacy Policy</p>
                <p className='hover:underline'>Terms & Conditions</p>
            </div>

          </div>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Navbar;
