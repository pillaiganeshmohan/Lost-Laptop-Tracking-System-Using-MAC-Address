import React, { useState, useEffect } from 'react';
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
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();

  const validateForm = (fields) => {
    let validationErrors = {};

    if (touched.fullName && !fields.fullName.trim()) {
      validationErrors.fullName = 'Full Name is required';
    }

    if (touched.email) {
      if (!fields.email.trim()) {
        validationErrors.email = 'Email is required';
      } else if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(fields.email)) {
        validationErrors.email = 'Email is invalid';
      }
    }

    if (touched.mobileNo) {
      if (!fields.mobileNo.trim()) {
        validationErrors.mobileNo = 'Mobile No is required';
      } else if (!/^\d{10}$/.test(fields.mobileNo)) {
        validationErrors.mobileNo = 'Mobile No must be 10 digits';
      }
    }

    if (touched.query && !fields.query.trim()) {
      validationErrors.query = 'Query is required';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'fullName') {
      setFullName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'mobileNo') {
      setMobileNo(value);
    } else if (name === 'query') {
      setQuery(value);
    }

    setTouched({
      ...touched,
      [name]: true,
    });
  };

  useEffect(() => {
    validateForm({ fullName, email, mobileNo, query });
  }, [fullName, email, mobileNo, query, touched]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm({ fullName, email, mobileNo, query })) {
      try {
        await axios.post('http://127.0.0.1:8000/api/contactus/', {
          full_name: fullName,
          email: email,
          contact_us: mobileNo,
          query: query,
        });
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
        navigate('/');
      } catch (error) {
        toast.error('Server Error!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <div className={`w-full flex items-center justify-center flex-col sm:justify-between sm:gap-4 bg-black`}>
      <img src={gradientLeft} className='absolute top-[50%] sm:w-1/2 sm:h-1/2 left-0 sm:top-[10%]' alt='Gradient Left' />
      <img src={gradientRight} className='sm:hidden absolute top-[15%] z-50 right-0 sm:top-[45%]' alt='Gradient Right' />
      <h1 className='z-20 my-10 text-5xl sm:text-4xl text-center font-semibold text-white'>Contact Us</h1>
      <form className='w-3/5 sm:w-11/12 bg-black flex flex-col items-center justify-center' onSubmit={handleSubmit}>
        <label className='text-white w-full text-left text-xl font-bold flex justify-between'>
          Full Name {errors.fullName && touched.fullName && <span className='text-red-500 text-lg font-semibold'>{errors.fullName}</span>}
        </label>
        <input
          name="fullName"
          className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white focus:outline-none'
          placeholder='Enter your Name'
          value={fullName}
          onChange={handleChange}
        />
        <label className='text-white w-full text-left text-xl font-bold flex justify-between'>
          Email {errors.email && touched.email && <span className='text-red-500 text-lg font-semibold'>{errors.email}</span>}
        </label>
        <input
          name="email"
          className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white focus:outline-none'
          placeholder='Enter your Email'
          value={email}
          onChange={handleChange}
        />
        <label className='text-white w-full text-left text-xl font-bold flex justify-between'>
          <label>Mobile No.</label>
           {errors.mobileNo && touched.mobileNo && <span className='text-red-500 text-lg font-semibold'>{errors.mobileNo}</span>}
        </label>
        <input
          name="mobileNo"
          className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white focus:outline-none'
          placeholder='Enter Mobile No'
          value={mobileNo}
          onChange={handleChange}
        />
        <label className='text-white w-full text-left text-xl font-bold flex justify-between'>
          How Can we help? {errors.query && touched.query && <span className='text-red-500 text-lg font-semibold'>{errors.query}</span>}
        </label>
        <input
          name="query"
          className='bg-black py-2 w-full mb-4 text-white border-b-2 border-white focus:outline-none'
          placeholder='Enter your queries'
          value={query}
          onChange={handleChange}
        />
        <button className='w-1/4 sm:w-1/2 bg-button hover:bg-purple-950 hover:border-2 hover:border-button py-4 my-8 px-10 text-xl text-white italic rounded-lg z-10' type='submit'>Submit</button>
      </form>
      <Footer />
    </div>
  );
}

export default ContactUs;
