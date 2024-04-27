import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SignUp from '../components/SlidingSignUpForm';
import Login from '../components/SlidingLoginForm';
import './Sliding.css';  // Your CSS styles
import slide_img from '../assets/sliding1.png';  // Your image asset

const Slider = () => {
    const location = useLocation();

    // Initialize isSignUp based on the navigation state or default to false
    const [isSignUp, setIsSignUp] = useState(location.state?.showSignUp ?? false);

    useEffect(() => {
        if (location.state?.showSignUp !== undefined) {
            setIsSignUp(location.state.showSignUp);
        }
    }, [location.state]);  // Re-run effect when location.state changes

    const toggleForm = () => {
        setIsSignUp((prev) => !prev);  // Toggle between signup and login forms
    };

    return (
        <div className="parent-container sm:flex sm:flex-col">
            <h1 className="hidden sm:block sm:-mt-20 sm:mb-10 text-3xl font-bold">
                Lost Laptop Tracking System
            </h1>
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="main">
                <div className="log-in" id="log-in">
                    <form action="#" className="form mt-3 sm:w-fit sm:-ml-48 sm:text-center">
                        <Login />  {/* Include your Login form component */}
                        <div className="mt-2 text-center text-xs">
                            Need an account?
                        </div>
                        <button type="button" onClick={toggleForm}>
                            <b className="text-xs hover:underline">Sign Up</b>
                        </button>
                    </form>
                </div>
                <div className="sign-up" id="sign-up">
                    <form action="#" className="form mt-3 sm:w-fit sm:-ml-7 sm:text-center">
                        <SignUp />  {/* Include your SignUp form component */}
                        <div className="mt-2 text-center text-xs sm:-ml-16 sm:mt-3">
                            Already have an Account?
                        </div>
                        <button type="button" onClick={toggleForm} className="text-xs hover:underline sm:mr-12 font-bold">
                            Jump Right
                        </button>
                    </form>
                </div>
                <div className="overlay-container sm:hidden">
                    <div className="overlay">
                        <div className="overlay-left">
                            <h1>Lost Laptop Tracking System</h1>
                            <img src={slide_img} alt="sliding1" className="mt-16" />
                        </div>
                        <div className="overlay-right">
                            <h1>Lost Laptop Tracking System</h1>
                            <img src={slide_img} alt="sliding1" className="mt-16" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
