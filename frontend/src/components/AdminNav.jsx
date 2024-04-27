import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

function AdminNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate()


  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userData') !== null;
    setIsLoggedIn(userLoggedIn);

    if (userLoggedIn) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      setFullName(userData.full_name);
    }
  }, []);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    console.log('Logout')
    localStorage.removeItem('userData');
    setIsLoggedIn(false); 
   toggleMobileMenu()
  };

  return (
    <div className='w-full flex h-[10vh] bg-black py-2 z-50 justify-between'>
      <div className='w-1/6 flex items-center sm:justify-center'>
       <Link to='/'> <img className='w-20 h-12 ml-12 sm:ml-6 flex' src={logo} alt="Logo"/></Link>
      </div>
      <div className='w-3/6 items-center justify-center gap-[5%] sm:hidden flex'>
        {/* Desktop menu links */}
        <Link className='text-white text-lg hover:no-underline relative inline cursor-pointer before:bg-button before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100' to='/#home'>Home</Link>
        <Link className='text-white text-lg hover:no-underline relative inline cursor-pointer before:bg-button before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100' to='/admin'>Upload Files</Link>
        <Link className='text-white text-lg hover:no-underline relative inline cursor-pointer before:bg-button before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100' to='/admin-user-approval'>Admin Approval</Link>
        <Link className='text-white text-lg hover:no-underline relative inline cursor-pointer before:bg-button before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100' to='/admin-queries'>Queries</Link>
       
       
      </div>
      <div className='w-1/6 sm:flex items-center sm:justify-center justify-end hidden'>
        {/* Mobile menu toggle button */}
        <button className="text-white text-lg" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <IoClose className='w-12 h-12 -mt-1'/> : <IoMenu className='w-12 h-12 -mt-1'/>}
        </button>
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="z-50 hidden absolute top-14 right-0 w-1/2 h-1/4 bg-black shadow-sm shadow-white hover:text-button bg-opacity-90 sm:flex flex-col items-center justify-center">
          <Link className='text-white text-lg mb-4'  to='/#home' onClick={toggleMobileMenu}>Home</Link>
          <Link className='text-white text-lg mb-4' to='/admin' onClick={toggleMobileMenu}>Upload Files</Link>
          <Link className='text-white text-lg mb-4' to='/admin-user-approval' onClick={toggleMobileMenu}>Admin Approval</Link>
          <Link className='text-white text-lg mb-4' to='/admin-queries' onClick={toggleMobileMenu}>Queries</Link>
         
          
          {!isLoggedIn && (
          <>
            <Link className='text-white text-lg mb-4' to='/login-signup' state={{ showSignUp: true }}>Login</Link>
            <Link className='text-white text-lg mb-4' to='/login-signup' state={{ showSignUp: false }}>Sign Up</Link>
          </>
        )}
        {isLoggedIn &&
           <Link onClick={handleLogout} className='text-white text-lg mb-4' to='/'>Logout</Link>
        }
         
        </div>
      )}
      <div className='w-2/6 flex items-center justify-end gap-6 mr-14 sm:hidden '>
        {!isLoggedIn && (
          <>
            <Link className='w-1/4 bg-button px-2 py-2 text-lg font-semibold text-white hover:bg-white hover:text-black rounded-md' to='/login-signup' state={{ showSignUp: true }}>Login</Link>
            <Link className='w-1/4 bg-button px-2 py-2 text-lg font-semibold text-white hover:bg-white hover:text-black rounded-md' to='/login-signup' state={{ showSignUp: false }}>Sign Up</Link>
          </>
        )}

        {isLoggedIn && 
        <>
        <label className='text-lg text-white font-semibold'>Welcome, {fullName}</label>
         <Link onClick={handleLogout} className='w-1/4 bg-button px-2 py-2 text-lg font-semibold text-white hover:bg-white hover:text-black rounded-md' to='/login-signup' state={{ showSignUp: true }}>Logout</Link>
         </>}
      </div>
    </div>
  );
}

export default AdminNav;