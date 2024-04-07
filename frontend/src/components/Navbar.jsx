import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.png'

function Navbar() {
  return (
    <div className='w-full flex bg-black h-full z-20 justify-between'>
        <div className='w-1/6 flex items-center'>
            <img className='w-20 h-12 ml-10 flex' src={logo}/>
        </div>
        <div className='w-3/6 flex items-center justify-end gap-12'>
            <Link className='text-white text-xl hover:underline' to='/'>Home</Link>
            <Link className='text-white text-xl hover:underline'  to='/walkthrough'>Walkthrough</Link>
            <Link className='text-white text-xl hover:underline' to='/about-us'>About Us</Link>
            <Link className='text-white text-xl hover:underline' to='/contact-us'>Contact Us</Link>

        </div>
        <div className='w-1/6 flex items-center justify-evenly'>
        <Link className='text-white text-xl hover:underline' to='/login'>Login</Link>
        <Link className='text-white text-xl hover:underline' to='/signup'>Sign Up</Link>
        </div>

    </div>
  )
}

export default Navbar