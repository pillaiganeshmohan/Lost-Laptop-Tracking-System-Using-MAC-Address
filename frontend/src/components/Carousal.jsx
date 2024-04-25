import React from 'react';
import { motion } from 'framer-motion';
import image1 from '../assets/ganesh.jpg';
import image2 from '../assets/Jannat.jpg';
import image3 from '../assets/member.png';
import image4 from '../assets/Tejas.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { IoMail } from "react-icons/io5";


const slides = [image1, image2, image3, image4];

const Carousal = ({ names, emails, linkedIn, twitter, mail, instagram }) => {
    const duplicatedSlides = [...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides, ...slides]; // Duplicate slides for seamless looping

    const calculateWidth = () => {
        const width = `calc(100% / ${slides.length})`; // Adjusted width calculation for carousel item
        return width;
    };

    return (
        <div id='about' className="relative w-full my-10 overflow-hidden font-inter">
            <motion.div
                className="flex"
                animate={{
                    x: ['0%', '-100%'],
                    transition: {
                        ease: 'linear',
                        duration: 30,
                        repeat: Infinity,
                    }
                }}
            >
                {duplicatedSlides.map((slide, index) => (
                    <div key={index} className={`flex-shrink-0 py-2 w-[${calculateWidth()}]`} style={{ marginRight: '5%' }}>
                       <div class="relative flex flex-col text-white bg-stone-900 shadow-myshadow bg-clip-border  shadow-neutral-200 rounded-xl w-80 sm:w-60">
                        <div class="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-stone-900 shadow-lg bg-clip-border rounded-xl h-72 sm:h-52">
                            <img src={slide} className='w-full h-full' alt="profile-picture" />
                        </div>
                        <div class="p-3 text-center">
                            <h4 class="block mb-2 font-sans text-2xl sm:text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                            {names[index % names.length]}
                            </h4>
                            <p
                            class="block font-sans text-base antialiased text-md sm:text-xs leading-relaxed text-white bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                            {emails[index % emails.length]}
                            </p>
                        </div>
                        <div class="flex justify-center items-center p-6 pt-2 gap-7">
                      <a href={linkedIn[index % linkedIn.length]}
                        class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 to-blue-400">
                        <FaLinkedin className='text-white'/>
                      </a>
                      <a href={twitter[index % twitter.length]}
                        class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400">
                        <FaTwitter className='text-white'/>
                      </a>
                      <a href={mail[index % mail.length]}
                        class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-light-blue-600 to-light-blue-400">
                        <IoMail className='text-white size-6'/>
                      </a>
                      <a href={instagram[index % instagram.length]}
                        class="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-purple-400">
                            <FaInstagram className='text-white'/>
                      </a>
                    </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Carousal;
