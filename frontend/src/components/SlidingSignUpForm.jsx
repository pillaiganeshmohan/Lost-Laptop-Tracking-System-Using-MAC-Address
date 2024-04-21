import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
// install: npm install react-icons


const SlidingSignUpForm = () => {
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [aadhaarError, setAadhaarError] = useState('');
  const [contactError, setContactError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [allError, setAllError] = useState(false);

  const handleAadhaarChange = (e) => {
    const value = e.target.value;
    setAadhaarNo(value);
    if (!/^\d{12}$/.test(value)) {
      setAadhaarError('*Aadhaar must be 12 digits');
    } else {
      setAadhaarError('');
    }
  };

  const handleContactChange = (e) => {
    const value = e.target.value;
    setContactNo(value);
    if (!/^\d{10}$/.test(value)) {
      setContactError('*Contact must be 10 digits');
    } else {
      setContactError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError('*Password must be 8 characters');
    } else {
      setPasswordError('');
    }
  };

  return (
    <div className="flex flex-col mt-2">
      <h1 className="flex text-2xl font-semibold mb-4 text-gray-700 justify-center sm:text-center sm:-ml-10">New to the System, <br/> Sign Up Now</h1>
      <form className="flex flex-col w-full max-w-md justify-left items-left -ml-16 sm:-ml-12">
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="fullName" className="mb-1 text-left text-sm text-gray-500 font-semibold">Full Name</label>
          <input type="text" id="fullName" className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Name" required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="policeId" className="mb-1 text-left text-sm text-gray-500 font-semibold">Police Id</label>
          <input type="text" id="policeId" className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Police Id" required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <div className="flex flex-row w-80 justify-between">
          <label htmlFor="aadhaarNo" className="mb-1 text-left text-sm text-gray-500 font-semibold">Aadhaar No.</label>
          {aadhaarError && <p className="text-red-500 text-xs">{aadhaarError}</p>}
          </div>
          <input type="text" id="aadhaarNo" value={aadhaarNo} onChange={handleAadhaarChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Aadhaar No." required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <div className="flex flex-row w-80 justify-between">
            <label htmlFor="contactNo" className="mb-1 text-left text-sm text-gray-500 font-semibold">Contact No.</label>
            {contactError && <p className="text-red-500 text-xs">{contactError}</p>}
          </div>
          <input type="text" id="contactNo" value={contactNo} onChange={handleContactChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Contact No." required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="address" className="mb-1 text-left text-sm text-gray-500 font-semibold">Address</label>
          <input type="text" id="address" className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Address" required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <div className="flex flex-row w-80 justify-between">
            <label htmlFor="password" className="mb-1 text-left text-sm text-gray-500 font-semibold">Password</label>
            {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
          </div>
          <div className="relative w-80 sm:w-[80vw] text-left">
            <input type={showPassword ? "text" : "password"} id="password" value={password} onChange={handlePasswordChange} className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="********" required/>
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
            <button type="submit" className={`${allError?'cursor-pointer':'cursor-not-allowed'} bg-gray-300 w-24 text-black py-2 font-semibold text-sm hover:bg-black hover:text-white`}
              >Sign Up</button>
            </div>
        </div>
      </form>
    </div>
  );
};

export default SlidingSignUpForm;
