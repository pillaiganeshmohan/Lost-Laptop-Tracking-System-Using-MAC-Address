import React, { useState } from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/ganesh.jpg';
import image2 from '../assets/Jannat.jpg';
import image3 from '../assets/member.png';
import image4 from '../assets/Tejas.png';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoMail } from "react-icons/io5";

const slides = [image1, image2, image3, image4];

const Carousal = ({ names, emails, linkedIn, twitter, mail, instagram }) => {
  const [isHovered, setIsHovered] = useState(false);

  const duplicatedSlides = [...slides, ...slides, ...slides, ...slides]; // Duplicate slides for seamless looping

  const calculateWidth = () => `calc(100% / ${slides.length})`;

  return (
    <div
      id="about"
      className="relative w-full my-10 overflow-hidden font-inter"
      onMouseEnter={() => setIsHovered(true)} // Pause animation on hover
      onMouseLeave={() => setIsHovered(false)} // Resume animation on leave
    >
      <motion.div
        className="flex py-6 w-full"
        animate={{
          x: isHovered ? null : ['0%', '-100%'], // Stop movement when hovered
          transition: {
            ease: 'linear',
            duration: 30,
            repeat: Infinity,
          },
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <motion.div
            key={index}
            className={`flex-shrink-0 w-[${calculateWidth()}]`} // Maintain consistent width
            style={{ marginRight: '5%' }}
            whileHover={{
              scale: 1.1, // Pop-up on hover
              zIndex: 1, // Ensure it's on top
              transformOrigin: 'center', // Maintain position when scaled
            }}
          >
            <div className="relative flex flex-col text-white bg-stone-900 shadow-myshadow bg-clip-border rounded-xl w-80 sm:w-60">
              <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-stone-900 shadow-lg bg-clip-border rounded-xl h-72 sm:h-52">
                <img src={slide} className="w-full h-full" alt="profile-picture" />
              </div>
              <div className="p-3 text-center">
                <h4 className="block mb-2 font-sans text-2xl sm:text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                  {names[index % names.length]}
                </h4>
                <p className="block font-sans text-base antialiased text-md sm:text-xs leading-relaxed text-white">
                  {emails[index % emails.length]}
                </p>
              </div>
              <div className="flex justify-center items-center p-6 pt-2 gap-7">
                <a href={linkedIn[index % linkedIn.length]}>
                  <FaLinkedin className="text-white" />
                </a>
                <a href={twitter[index % twitter.length]}>
                  <FaTwitter className="text-white" />
                </a>
                <a href={mail[index % mail.length]}>
                  <IoMail className="text-white" />
                </a>
                <a href={instagram[index % instagram.length]}>
                  <FaInstagram className="text-white" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousal;
