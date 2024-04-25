import React, { useState } from 'react';
import gradientLeft from '../assets/gradientLeft.png';
import gradientRight from '../assets/gradientRight.png';
import Footer from '../components/Footer';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactUs() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [query, setQuery] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()
  const validateForm = () => {
    const errors = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!mobileNo.trim()) {
      errors.mobileNo = 'Mobile No is required';
    } else if (!/^\d{10}$/.test(mobileNo)) {
      errors.mobileNo = 'Mobile No must be 10 digits';
    }

    if (!query.trim()) {
      errors.query = 'Query is required';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/contactus/', {full_name: fullName, email: email, contact_us: mobileNo, query: query});
        toast.success('Query Submitted Successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
      catch (error) {
        toast.error('Server Error!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      }
      

      console.log('Form submitted successfully');
      navigate('/')
    }
  };

  return (
    <div id='1' className={`w-full flex items-center justify-center flex-col sm:justify-between sm:gap-4 bg-black`}>
      <img src={gradientLeft} className='absolute top-[50%] sm:w-1/2 sm:h-1/2 left-0 sm:top-[10%]' alt='Gradient Left' />
      <img src={gradientRight} className='sm:hidden absolute top-[15%] z-50 right-0 sm:top-[45%]' alt='Gradient Right' />
      <h1 className='z-20 my-10 text-5xl sm:text-4xl text-center font-semibold text-white'>Contact Us</h1>
      <form className='w-3/5 sm:w-full bg-black flex flex-col items-center justify-center'>
        <label className='text-white w-full text-left text-xl font-bold flex justify-between'>
        <label> Full Name </label>{errors.fullName && <span className='text-red-500 text-lg font-semibold'>{errors.fullName}</span>}</label>
        <input
          className='bg-black  w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
          placeholder='Enter your Name'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        
        <label className='text-white w-full text-left text-xl font-bold flex justify-between'>
        <label> Email </label>{errors.email && <span className='text-red-500 text-lg font-semibold'>{errors.email}</span>}</label>
              <input
          className='bg-black w-full  py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
          placeholder='Enter your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <label className='text-white w-full text-left text-xl font-bold flex justify-between'>
        <label> Mobile No. </label>{errors.mobileNo && <span className='text-red-500 text-lg font-semibold'>{errors.mobileNo}</span>}</label>
      
        <input
          className='bg-black w-full  py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
          placeholder='Enter Mobile No'
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
       <label className='text-white w-full text-left text-xl font-bold flex justify-between'>
        <label> How Can we help? </label>{errors.query && <span className='text-red-500 text-lg font-semibold'>{errors.query}</span>}</label>
      
        <input
          className='bg-black py-2 w-full  mb-4 text-white border-b-2 border-white  focus:outline-none'
          placeholder='Enter you queries'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        /> 
        <button className='w-1/4 sm:w-1/2 bg-button py-4 my-8 px-10 text-xl text-white italic rounded-lg z-10' type='submit' onClick={handleSubmit}>Submit</button>
      </form>
      <Footer />
    </div>
  );
}

export default ContactUs;
