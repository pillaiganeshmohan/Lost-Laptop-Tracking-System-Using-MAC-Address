import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

const SlidingLoginForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Check form validity whenever formData or errors change
    const isValid = formData.email.trim() && formData.password.trim() && 
                    !errors.email && !errors.password;
    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(value)) {
          error = 'Email is invalid';
        }
        break;
      case 'password':
        if (!value.trim()) {
          error = 'Password is required';
        } else if (value.length < 8) { 
          error = 'Must be at least 8 characters .';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
        toast.success('Logged In Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem('userData', JSON.stringify(response.data));
        console.log("Logged In Successfully", response.data);
        setTimeout(() => {
          navigate('/registration')
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data && error.response.data.non_field_errors) {
          const errorMessage = error.response.data.non_field_errors[0];
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.log(error);
        }
      }
    } else {
      toast.error('Please correct the errors before submitting.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  
  return (
    <div className="flex flex-col mt-2">
      <div className="w-9/11">
        <h1 className="flex text-2xl font-semibold mb-4 text-gray-700 justify-center sm:text-center sm:-ml-10">Welcome Back, <br/> Login Here</h1>
        <form className="sm:form flex flex-col w-full max-w-md justify-left -ml-2 items-left sm:-ml-6">
          <div className="flex flex-col mb-4 w-full">
          <div className='w-full flex justify-between'>
          <label htmlFor="email" className="mb-1 text-left text-sm text-gray-500 font-semibold">Email Id</label>
          {errors.email && <span className="text-red-500 text-sm font-semibold">{errors.email}</span>}
          </div>

            <input type="text" name="email" value={formData.email} onChange={handleInputChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Email Id" required/>
            <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
          </div>
          <div className="flex flex-col mb-4 w-full">
            <div className='w-full flex justify-between'>
            <label htmlFor="password" className="mb-1 text-left text-sm text-gray-500 font-semibold">Password</label>
            {errors.password && <span className="text-red-500 text-sm font-semibold">{errors.password}</span>}
            </div>
            <div className="relative w-80 sm:w-[80vw] text-left">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-80 text-xs outline-none sm:w-[70vw]"
                placeholder="********"
                required
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                {showPassword ? <FaEyeSlash onClick={() => setShowPassword(false)} /> : <FaEye onClick={() => setShowPassword(true)} />}
              </span>
            </div>
            <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
          </div>
          <div className="flex items-center justify-center w-full  -mt-2">
            <button type="submit" onClick={handleSubmit} className={`bg-gray-300 w-24 text-black py-2 px-5 sm:ml-12 font-semibold text-sm hover:bg-black hover:text-white ${!isFormValid? ' cursor-not-allowed':'cursor-pointer '}`} disabled={!isFormValid}>Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlidingLoginForm;
