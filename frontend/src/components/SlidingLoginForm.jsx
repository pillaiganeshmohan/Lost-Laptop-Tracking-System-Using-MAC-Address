import React, { useState } from 'react';
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
  const [allError, setAllError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };
  
  return (
    <div className="flex flex-col mt-2">
      <div className="w-9/11">
        <h1 className="flex text-2xl font-semibold mb-4 text-gray-700 justify-center sm:text-center sm:-ml-10">Welcome Back, <br/> Login Here</h1>
        <form className="flex flex-col w-full max-w-md justify-left items-left -ml-16 sm:-ml-6">
          <div className="flex flex-col mb-4 w-full">
            <label htmlFor="email" className="mb-1 text-left text-sm text-gray-500 font-semibold">Email Id</label>
            <input type="text" name="email" value={formData.email} onChange={handleInputChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Email Id" required/>
            <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
          </div>
          <div className="flex flex-col mb-4 w-full">
            <label htmlFor="password" className="mb-1 text-left text-sm text-gray-500 font-semibold">Password</label>
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
          <div className="flex flex-row justify-between mt-3">
            <div className="flex items-left flex-row">
              <input type="checkbox" id="terms" className="h-4 w-4 border border-gray-700  checked:bg-black checked:border-black"/>
              <label htmlFor="terms" className="text-xs w-32"><i>Remember Me</i></label>
            </div>
            <div className="flex items-right ml-20 -mt-2">
              <button type="submit" onClick={handleSubmit} className={`cursor-pointer bg-gray-300 w-24 text-black py-2 px-5 font-semibold text-sm hover:bg-black hover:text-white`}>Log In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlidingLoginForm;
