import React from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center bg-black p-4 max-w-full">
      <div
        className="w-11/12 px-4 py-10 sm:px-2 flex flex-col sm:flex-row items-center sm:items-start justify-between max-w-screen-xl mx-auto"
        style={{
          borderTop: "1px solid #fff ",
          borderBottom: "1px solid #fff ",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:w-1/2 gap-5 items-center sm:items-start sm:ml-0 justify-center sm:justify-start">
          <img src={logo} className="h-24 w-32 sm:h-20 sm:w-28" alt="Logo" />
          <label className="text-center sm:text-left text-white tracking-wider font-bold sm:text-2xl text-lg">
            Keep better track of your laptop with a security system you can
            vouch for
          </label>
        </div>
        <div className="flex gap-10 items-start sm:flex-row sm:w-1/2 justify-center sm:justify-end text-white mt-10 sm:mt-0">
          <div className="flex flex-col sm:flex-row gap-6 justify-center sm:justify-end w-full">
            <label className="flex flex-col items-center sm:items-start gap-2">
              <p className="font-semibold text-lg">Explore</p>
              <p className="hover:underline">
                <Link to="/">Home</Link>
              </p>
              <p className="hover:underline">
                <Link to="/walkthrough">Walkthrough</Link>
              </p>
              <p className="hover:underline">
                <Link to="/about-us">About Us</Link>
              </p>
              <p className="hover:underline">
                <Link to="/contact-us">Contact us</Link>
              </p>
            </label>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center sm:justify-end w-full">
            <label className="flex flex-col items-center sm:items-start gap-2 mt-4 sm:mt-0 sm:ml-6">
              <p className="font-semibold text-lg">Contact Us</p>
              <p className="flex items-center">xyz@gmail.com</p>
              <p className="flex items-center">+91 9876543211</p>
            </label>
          </div>
        </div>
      </div>
      <p className="text-white text-sm p-4 max-w-full">
        Copyright 2024 | © All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
