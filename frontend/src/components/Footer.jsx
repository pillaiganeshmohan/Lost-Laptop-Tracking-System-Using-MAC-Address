import React from 'react'
import logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <div className=' flex flex-col w-full items-center justify-center bg-black p-4'>
    <div className='w-11/12 px-4 py-10 sm:px-0 flex sm:flex-col' style={{ borderTop: "1px solid #fff ",borderBottom: "1px solid #fff "}}>
    <div className='flex sm:w-full sm:mr-2 sm:flex-row flex-col w-1/2 gap-5 items-start sm:ml-0 ml-10 justify-start  sm:items-center sm:justify-between'>
        <img src={logo} className='h-24 w-32 sm:h-20 sm:w-28'/>
        <label className='text-2xl text-left sm:text-lg text-white tracking-wider font-bold'>Keep better track of your laptop with a security system you can vouch for</label>
        </div>
    <div className='flex w-1/2 items-center sm:mt-4 justify-start sm:justify-center sm:w-full  text-white'>
        <div className='flex ml-52 sm:ml-0 w-4/5 sm:w-full gap-6 justify-end sm:justify-center'>
            <label className='w-1/2 flex flex-col gap-4'>
             <p className='font-semibold text-left text-lg'>Explore</p>
             <p className=' hover:underline text-left'><Link to='/'>Home</Link></p> 
             <p className=' hover:underline text-left'><Link to='/walkthrough'>Walkthrough</Link></p> 
             <p className=' hover:underline text-left'><Link to='/about-us'>About Us</Link></p>  
             <p className=' hover:underline text-left'><Link to='/contact-us'>Contact us</Link></p>   
            </label>
            <label className='w-1/2 flex flex-col ml-16 sm:ml-2 items-start gap-3 '>
  
                   
                <p className='font-semibold text-lg sm:mt-1 '>Contact Us</p> 
                <p className='flex items-center mr-3'> xyz@gmail.com</p>   
                 <p className='flex items-center mr-2'> +91 9876543211</p>   
            </label>

        </div>
    </div>

    </div>
    <p className='text-white text-sm p-4'>Copyright 2024   |   ©  All rights reserved. </p>   
    </div>
  )
}

export default Footer