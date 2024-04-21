import React,{useState} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SlidingLoginForm = () => {
  const [allError, setAllError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col mt-2">
      <div className="w-9/11">
      <h1 className="flex text-2xl font-semibold mb-4 text-gray-700 justify-center sm:text-center sm:-ml-10">Welcome Back, <br/> Login Here</h1>
      <form className="flex flex-col w-full max-w-md justify-left items-left -ml-16 sm:-ml-6">
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="policeId" className="mb-1 text-left text-sm text-gray-500 font-semibold">Police Id</label>
          <input type="text" id="policeId" className="w-80 text-xs outline-none sm:w-[70vw]" placeholder="Enter Your Police Id" required/>
          <hr className="border-b-gray-200 border-2 w-80 sm:w-[80vw]"/>
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="password" className="mb-1 text-left text-sm text-gray-500 font-semibold">Password</label>
          <div className="relative w-80 sm:w-[80vw] text-left">
              <input type={showPassword ? "text" : "password"}
                onClick={() => {
                  if (showPassword === '') {
                    setAllError(true);
                  }
                }
                }
                id = "password" className = "w-80 text-xs outline-none sm:w-[70vw]" placeholder = "********" required />
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
              <button type="submit" className={`${allError?'cursor-pointer':'cursor-not-allowed'} bg-gray-300 w-24 text-black py-2 px-5 font-semibold text-sm hover:bg-black hover:text-white`}>Log In</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlidingLoginForm;
