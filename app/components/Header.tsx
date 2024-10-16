"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import '../globals.css';
import Logo from '../public/images/logo.png';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import defaultImage from '../public/default.jpg';
import { MdHelpOutline } from 'react-icons/md';

interface DecodedToken {
  name: string;
  image?: string;
}

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [profilepic, setProfilepic] = useState<string>(defaultImage.src); // Use the src property
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // For mobile menu
  const { data: session, status } = useSession();
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [isUserImageAvailable, setIsUserImageAvailable] = useState(false);

  // Refs to detect outside click
  const dropdownRef = useRef<HTMLLIElement>(null);
  const helpRef = useRef<HTMLLIElement>(null);

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false, // Disable automatic redirection
        callbackUrl: '/login', // Redirect user after sign out
      });
  
      localStorage.removeItem('userImage'); // Clear any localStorage data
  
      window.location.href = '/login'; // Manual redirection
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleHelp = () => {
    setHelpOpen(!helpOpen); // Toggles the help popup
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    
    const userImage = localStorage.getItem('userImage');
    if (userImage) {
      setIsUserImageAvailable(true);
      console.log("imagefound");
      fetchUserImage();
      setProfilepic(userImage); // Use the user image from local storage
    } else if (session?.user) {
      console.log("imagenotfound");
      fetchUserImage();
    }
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside of the dropdown
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        helpRef.current && !helpRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
        setHelpOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, helpRef, session]);

  const fetchUserImage = async () => {
    console.log("asdasdasdasd");
    try {
      
      const response = await fetch('/api/userimage', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id, 
          type: session?.user?.type, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      if (data.image) {
        localStorage.setItem('userImage', data.image);
        setProfilepic(data.image);
        setIsUserImageAvailable(true);
      }
    } catch (error) {
      console.error('Failed to fetch user image:', error);
    }
  };


  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-black text-2xl font-bold flex-shrink-0" onClick={closeMenu}>
          <Image src={Logo} className="logo" alt="logo" />
        </Link>
        <div className="md:hidden flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="text-gray-500 focus:outline-none focus:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
        <nav className={`${menuOpen ? 'block' : 'hidden'} md:flex md:items-center w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-0">
            {session ? (
              <>
                {session?.user?.type !== 'coach' && isUserImageAvailable && (
                  <li className="pt-[8px]">
                    <Link href="/browse" className="text-black hover:text-black-300" onClick={closeMenu}>
                      Browse Coach
                    </Link>
                  </li>
                )}
                {session?.user?.type === 'coach' && (
                  <li className="pt-[8px]">
                    <Link href="/coach/dashboard" className="text-black hover:text-black-300" onClick={closeMenu}>
                      Dashboard
                    </Link>
                  </li>
                )}
                {session?.user?.type !== 'coach' && (
                  <li className="pt-[8px]">
                    <Link href="/dashboard" className="text-black hover:text-black-300" onClick={closeMenu}>
                      Dashboard
                    </Link>
                  </li>
                )}

                <li className="pt-[8px]">
                  <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeMenu}>
                    Hello, {session?.user?.name || "Player"}!
                  </Link>
                </li>
                <li className="relative" ref={dropdownRef}>
                  <button onClick={toggleDropdown} className="flex items-center">
                    <Image
                      src={localStorage.getItem('userImage') || defaultImage}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                      <ul>
                        <li>
                          <Link href="/settings" className="block px-4 py-2 text-black hover:bg-blue-300" onClick={closeMenu}>
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-black hover:bg-blue-300">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/browse" className="text-black hover:text-black-300" onClick={closeMenu}>
                    Browse Coach
                  </Link>
                </li>
                <li>
                  <Link href="/coach/signup" className="text-black hover:text-black-300" onClick={closeMenu}>
                    Coach Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={closeMenu}>
                    Player Sign Up
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="text-black hover:text-blue-300" onClick={closeMenu}>
                    Login
                  </Link>
                </li>
              </>
            )}

            <li className="relative" ref={helpRef}>
              <button onClick={toggleHelp} className="ml-4">
                <MdHelpOutline className="text-black w-8 h-8" />
              </button>
              {helpOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md p-4">
                  <p>For technical difficulties and general site
                    feedback, Email us at </p>
                  <a className="font-bold" href='mailto:team@d1notes.com'>team@d1notes.com</a>
                  <button onClick={toggleHelp} className="text-blue-500 mt-2">
                    Close
                  </button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
