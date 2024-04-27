import React, {useEffect, useState} from 'react'
import logo from '../assets/Logo.png'
import { Link, useLocation } from 'react-router-dom'


function Footer() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return (
    <div className=' flex flex-col w-full items-center justify-center bg-black p-4 sm:px-1'>
    <div className='w-11/12 px-4 py-10 sm:px-0 flex sm:flex-col' style={{ borderTop: "1px solid #fff ",borderBottom: "1px solid #fff "}}>
    <div className='flex sm:justify-center sm:w-full sm:mr-2 sm:flex-row flex-col w-1/2 gap-5 items-start sm:ml-0 ml-10 justify-start  sm:items-center'>
        <img src={logo} className='h-24 w-32 sm:h-20 sm:w-28'/>
        <label className='sm:hidden text-2xl text-left sm:text-lg text-white tracking-wider font-bold'>Keep better track of your laptop with a security system you can vouch for</label>
        </div>
    <div className='flex w-1/2 items-center sm:mt-4 justify-start sm:justify-center sm:w-full  text-white'>
        <div className='flex ml-24 sm:flex-col sm:ml-0 w-4/5 sm:w-full gap-6 sm:gap-2 justify-end sm:justify-center sm:items-center'>
            <label className='w-1/2 sm:w-full flex flex-col sm:flex-row gap-4 sm:gap-2 sm:justify-between sm:text-sm'>
             <p className=' text-white w-fit text-lg hover:no-underline relative inline cursor-pointer before:bg-button before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'><Link to='/#home'>Home</Link></p> 
             <p className=' text-white w-fit text-lg hover:no-underline relative inline cursor-pointer before:bg-button before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100'><Link to='/#walkthrough'>Walkthrough</Link></p> 
             <p className=' htext-white w-fit text-lg hover:no-underline relative inline cursor-pointer before:bg-button before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 sm:whitespace-nowrap'><Link to='/#about'>About Us</Link></p>  
             <p className=' text-white w-fit text-lg hover:no-underline relative inline cursor-pointer before:bg-button before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 sm:whitespace-nowrap'><Link to='/contact/#1'>Contact us</Link></p>   
            </label>
            <label className='w-1/2 sm:w-full sm:flex-col sm:justify-center sm:items-center flex flex-col ml-10 sm:ml-0 sm:gap-0 items-start gap-3 '>
  
                   
                <p className='flex items-center mr-3 whitespace-nowrap'> xyz@gmail.com</p>   
                 <p className='flex items-center mr-2 whitespace-nowrap'> +91 9876543211</p>   
            </label>

        </div>
    </div>

    </div>
    <p className='text-white text-sm p-4'>Copyright 2024   |   ©  All rights reserved. </p>   
    </div>
  )
}

export default Footer