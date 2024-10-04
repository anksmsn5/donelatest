"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import '../globals.css'; 
import Logo from '../public/images/logo.png';
import Image from 'next/image';
import jwt from 'jsonwebtoken';
import defaultImage from '../public/default.jpg';

interface DecodedToken {
  name: string;
}

const Header: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<DecodedToken | null>(null);
  const [profilepic,setProfilepic] = useState<DecodedToken | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('modalShown');
    
    window.location.href = '/login';
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem('token');

    if (token) {
      const decoded = jwt.decode(token) as DecodedToken; // Decode without verifying
      setUserName(decoded.name);
      setProfilepic(decoded.image || '/default.jpeg');
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white-600 shadow-outline">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-white text-2xl font-bold">
          <Image src={Logo} className='logo' alt="logo" />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {isAuthenticated ? (
              <>
              <li>
                  <Link href="/completeprofile" className="text-black hover:text-blue-300">
                    Hello, {userName ? userName : 'User'}!
                  </Link>
                </li>
                <li className="relative">
                  <button onClick={toggleDropdown} className="flex items-center">
                    <Image 
                      src={ profilepic|| defaultImage} // Replace with your default image path
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full" // Make the image circular
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                      <ul>
                        <li>
                          <Link href="/settings" className="block px-4 py-2 text-black hover:bg-blue-300">
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
                  <Link href="/browse" className="text-black hover:text-black-300">Browse Coach</Link>
                </li>
                <li>
                  <Link href="/coach/signup" className="text-black hover:text-black-300">Coach Sign Up</Link>
                </li>
                <li>
                  <Link href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Player Sign Up</Link>
                </li>
                <li>
                  <Link href="/login" className="text-black hover:text-blue-300">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
