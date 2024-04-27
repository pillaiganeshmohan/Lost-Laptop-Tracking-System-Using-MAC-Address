import React, { useState, useEffect } from 'react'
import bg from '../assets/HomeBG.png'
import { Link, useNavigate } from 'react-router-dom'
import RegistationForm from '../components/RegistationForm'
import ExistingRecords from '../components/ExistingRecords'
import Footer from '../components/Footer'
import axios from 'axios'
import Slider from './Slider'




function Registration() {
  const [registrationButtonClicked, setRegistrationButtonClicked] = useState(false)
  const [existingButtonClicked, setExistingButtonClicked] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userData') !== null;
    setIsLoggedIn(userLoggedIn);
    if (!userLoggedIn) {
      navigate('/login-signup', { state: { showSignUp: true } });
    }
  }, [navigate]);
  return (
    <>
    <div className='w-full flex flex-col bg-black h-full z-20 sm:justify-start justify-between'>
      <div className='w-full flex flex-col items-center h-[90vh] sm:h-[50vh] justify-center gap-14 sm:gap-10 sm:px-6'>
        <img src={bg} className='z-0 absolute sm:hidden top-20 w-full h-[87vh] object-fill'/>
        <hl className='text-white font-semibold text-6xl sm:text-4xl z-20'>Track Your Laptop Now</hl>
        <div className='flex gap-16 sm:gap-10 sm:flex-col sm:items-center sm:justify-center sm:w-11/12'>
          <Link to='#registration' onClick={() =>{
            setRegistrationButtonClicked(true)
            setExistingButtonClicked(false)
          }} className='sm:w-[60%] bg-button py-4 hover:bg-purple-950 hover:border-2 hover:border-button mt-4 px-10 sm:px-4 text-xl sm:text-lg text-white italic rounded-lg z-10'>Register Now</Link>
          <Link to='#records' onClick={() =>{
            setRegistrationButtonClicked(false)
            setExistingButtonClicked(true)
          }} className=' sm:w-[60%] bg-button hover:bg-purple-950 hover:border-2 hover:border-button py-4 mt-4 px-10 sm:px-2 text-xl sm:text-lg text-white italic rounded-lg z-10'>Existing Records</Link>
        </div>
      </div>
    </div>
    <RegistationForm myClass={registrationButtonClicked?'flex bg-black':'hidden'}/>
    <ExistingRecords myClass={existingButtonClicked?'flex bg-black':'hidden'}/>
    <Footer/>
    </>
  )
}

export default Registration