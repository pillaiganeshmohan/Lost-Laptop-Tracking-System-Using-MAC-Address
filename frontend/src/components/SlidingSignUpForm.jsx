import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { Link } from 'react-router-dom';


const SlidingSignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    police_id: '', 
    aadhaar_no: '', 
    contact_no: '', 
    full_name: '',
    password: ''
  });
  const [aadhaarError, setAadhaarError] = useState('');
  const [contactError, setContactError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [allError, setAllError] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'aadhaar_no') { 
      if (!/^\d{12}$/.test(value)) {
        setAadhaarError('Aadhaar must be 12 digits');
      } else {
        setAadhaarError('');
      }
    }

    if (name === 'contact_no') { 
      if (!/^\d{10}$/.test(value)) {
        setContactError('Contact must be 10 digits');
      } else {
        setContactError('');
      }
    }

    if (name === 'password') {
      if (value.length < 8) {
        setPasswordError('Password must be 8 characters');
      } else {
        setPasswordError('');
      }
    }
    if (name === 'email') {
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        console.log('email')
        setEmailError('Email Incorrect');
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (aadhaarError || contactError) {
        toast.error("Please correct the errors before submitting.");
        return;
    }

    try {
        // Simulate a successful registration request with a success toast
        const response = await axios.post('http://127.0.0.1:8000/api/users/register/', formData);

        if(response)
        {
          toast.success('Registered Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        console.log("Registered Successfully", formData);

        const signUpState = { showSignUp: true };  
        navigate('/login-signup', { state: signUpState });  
        }
        
    } catch (error) {
        console.log(error);
        toast.error("Registration failed. Please try again.");
    }
};
 
  return (
    <div className="flex flex-col mt-2">
      <h1 className="flex text-2xl font-semibold mb-4 text-gray-700 justify-center sm:text-center sm:-ml-10">New to the System, <br/> Sign Up Now</h1>
      <form className="flex flex-col w-full max-w-md justify-left items-left -ml-16 sm:-ml-12">
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="fullName" className="mb-1 text-left text-sm text-gray-500 font-semibold">Full Name</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleInputChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Name" required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="policeId" className="mb-1 text-left text-sm text-gray-500 font-semibold">Police Id</label>
          <input type="text" name="police_id" value={formData.police_id} onChange={handleInputChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Police Id" required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <div className="flex flex-row w-80 justify-between">
            <label htmlFor="aadhaarNo" className="mb-1 text-left text-sm text-gray-500 font-semibold">Aadhaar No.</label>
            {aadhaarError && <p className="text-red-500 text-xs">{aadhaarError}</p>}
          </div>
          <input type="text" name="aadhaar_no" value={formData.aadhaar_no} onChange={handleInputChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Aadhaar No." required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <div className="flex flex-row w-80 justify-between">
            <label htmlFor="contactNo" className="mb-1 text-left text-sm text-gray-500 font-semibold">Contact No.</label>
            {contactError && <p className="text-red-500 text-xs">{contactError}</p>}
          </div>
          <input type="text" name="contact_no" value={formData.contact_no} onChange={handleInputChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Contact No." required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
        <div className="flex flex-row w-80 justify-between">
          <label htmlFor="address" className="mb-1 text-left text-sm text-gray-500 font-semibold">Email</label>
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
        </div>  
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Email" required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
          

        </div>
        <div className="flex flex-col mb-4 w-full">
          <div className="flex flex-row w-80 justify-between">
            <label htmlFor="password" className="mb-1 text-left text-sm text-gray-500 font-semibold">Password</label>
            {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
          </div>
          <div className="relative w-80 sm:w-[80vw] text-left">
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="********" required/>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              {showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} />}
            </span>
          </div>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]" />
        </div>
        <div className="flex flex-row justify-between mt-1">
            <div className="flex items-left flex-row w-60">
              <input type="checkbox" id="terms" onClick={() => {
              if (aadhaarError === '' && contactError === '' ) {
                setAllError(true);
              }
              }} className="h-4 w-4 border border-gray-700  checked:bg-black checked:border-black" required/>
              <label htmlFor="terms" className="text-xs w-44"><i>I accept Terms & Conditions</i></label>
            </div>
            <div className="flex items-right -mt-2 ml-8">
            <Link to='/login-signup' state={{ showSignUp: false }} onClick={handleSubmit} className={`${allError?'cursor-pointer':'cursor-not-allowed'} bg-gray-300 w-24 text-black py-2 font-semibold text-sm hover:bg-black hover:text-white`}
              >Sign Up
              </Link>
            </div>
        </div>
      </form>
    </div>
  );
};

export default SlidingSignUpForm;
