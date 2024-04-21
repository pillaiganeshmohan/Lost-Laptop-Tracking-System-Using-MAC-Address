import React, { useState } from 'react'
import bg from '../assets/HomeBG.png'
import { Link } from 'react-router-dom'
import RegistationForm from '../components/RegistationForm'
import ExistingRecords from '../components/ExistingRecords'
import Footer from '../components/Footer'
function Registration() {
  const [registrationButtonClicked, setRegistrationButtonClicked] = useState(false)
  const [existingButtonClicked, setExistingButtonClicked] = useState(false)

  return (
    <>
    <div className='w-full flex flex-col bg-black h-full z-20 justify-between'>
      <div className='w-full flex flex-col items-center h-[90vh] justify-center gap-14'>
        <img src={bg} className='z-0 absolute top-20 w-full h-[87vh] object-fill'/>
        <hl className='text-white font-semibold text-6xl z-20'>Track Your Laptop Now</hl>
        <div className='flex gap-16'>
          <Link onClick={() =>{
            setRegistrationButtonClicked(true)
            setExistingButtonClicked(false)
          }} className='bg-button py-4 mt-4 px-10 text-xl text-white italic rounded-lg z-10'>Register Now</Link>
          <Link onClick={() =>{
            setRegistrationButtonClicked(false)
            setExistingButtonClicked(true)
          }} className='bg-button py-4 mt-4 px-10 text-xl text-white italic rounded-lg z-10'>Existing Records</Link>
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