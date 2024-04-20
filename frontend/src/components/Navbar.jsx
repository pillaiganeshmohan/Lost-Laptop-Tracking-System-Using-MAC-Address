import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";

function Navbar() {
  return (
    <div className="w-full flex bg-black h-full z-20 justify-between">
      <div className="w-1/6 flex items-center">
        <img className="w-20 h-12 ml-10 flex" src={logo} alt="Logo" />
      </div>
      <div className="w-3/6 flex items-center justify-end gap-12 nav-links">
        <Link className="text-white hover:underline nav__link" to="/">
          Home
        </Link>
        <Link
          className="text-white hover:underline nav__link"
          to="/walkthrough"
        >
          Walkthrough
        </Link>
        <Link className="text-white hover:underline nav__link" to="/about-us">
          About Us
        </Link>
        <Link className="text-white hover:underline nav__link" to="/contact-us">
          Contact Us
        </Link>
      </div>
      <div className="w-1/6 flex items-center justify-evenly nav-links">
        <Link className="text-white hover:underline nav__link" to="/login">
          Login
        </Link>
        <Link className="text-white hover:underline nav__link" to="/signup">
          Sign Up
        </Link>
      </div>

      <style jsx>{`
        .nav-links a {
          font-size: 1.25rem; /* 20px */
        }

        @media (max-width: 600px) {
          .nav-links a {
            font-size: 10px; /* 16px */
          }
        }
      `}</style>
    </div>
  );
}

export default Navbar;
