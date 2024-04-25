import React, {useState, useEffect} from 'react'
import bg from '../assets/HomeBG.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import work from '../assets/p1.png'
import gradientLeft from '../assets/gradientLeft.png'
import gradientRight from '../assets/gradientRight.png'
import rect from '../assets/Rectangle.png'
import ganesh from '../assets/ganesh.png'
import jannat from '../assets/Jannat.png'
import member from '../assets/member.png'
import tejas from '../assets/Tejas.png'
import Footer from '../components/Footer'
import Carousal from '../components/Carousal'

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
      const userLoggedIn = localStorage.getItem('userData') !== null;
      setIsLoggedIn(userLoggedIn);
    }, [navigate]);
  
    const handleGetStarted = () => {
      if (!isLoggedIn) {
        navigate('/slider', { state: { showSignUp: true } });
      }
      else{
        navigate('/registration')
      }
    }

    useEffect(() => {
      const hash = location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [location]);
  return (
    <>
        <div id='home' className='w-full flex flex-col items-center h-[90vh]  sm:h-[40vh] justify-center gap-6 bg-black'>
        <img src={bg} className='z-0 absolute top-20 sm:top-[25%] w-full h-[90vh] sm:hidden object-fill'/>
        <h1 className='font-semibold text-[64px] sm:text-4xl leading-[70px] tracking-tight text-white z-10'>Lost Laptop Tracking System<br/> Using MAC Address</h1>
        <label className='text-xl text-white z-10'>“Upgrade your Laptop’s Security to the Utopian Level with <br/> Lost Laptop Tracking System”</label>
      <label onClick={handleGetStarted} class="cursor-pointer relative inline-flex items-center justify-center p-4 px-14 py-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-button rounded-xl shadow-md group">
      <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-button group-hover:translate-x-0 ease">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </span>
      <span class="absolute flex items-center justify-center w-full h-full text-white text-xl font-semibold transition-all duration-300 transform group-hover:translate-x-full ease">Get Started</span>
      <span class="relative invisible">Get Started</span>
      </label>
    </div>
    <div className='w-full flex sm:flex-col h-[100vh] sm:h-[60vh] justify-center bg-black gap-3'>
    <img src={gradientLeft} className='absolute left-0'/>
        <div className='w-1/2 sm:w-full flex-col items-center justify-center gap-6 flex'>

            <h1 className='w-4/5 text-6xl sm:text-4xl sm:text-center text-left font-semibold tracking-tight text-white'>One step solution<br/> for a complete<br/> protection of your<br/> device</h1>
            <label className='w-4/5 text-left sm:text-center text-xl tracking-tight text-white'>With some amazing features in hand, rest assured about the security of your personal information from the eyes of those malicious hackers. Our Lost Laptop Tracking System has been equipped with all that's necessary to keep your device fully secure, all at the comfort of your fingertips!</label>
        </div>
        <div className='w-1/2 sm:w-full flex items-center justify-start' >

            <div className='w-11/12 items-start justify-start'>
            <img src={work} className=' object-fill w-full sm:hidden'/>
            </div>
        </div>

    </div>
    <div className='w-full flex  h-[100vh] sm:h-[40vh] bg-black justify-end'>
    <img src={gradientRight} className='absolute w-1/4 h-4/5 sm:mt-10'/>
    <div id='walkthrough' className='flex w-full flex-col items-center sm:justify-center'>
    <h1 className='my-12 text-5xl text-center font-semibold text-white'>
    Walkthrough
    </h1>
    <div className='flex flex-col h-5/6 w-full gap-6 items-center'>
      <div className='w-10/12 h-full bg-gray-500'>
        <iframe src="https://www.youtube.com/embed/ht5VrWvmHEM?si=1k17wMhxvxZxRf3g" className='w-full h-full shadow-myshadow shadow-button' frameborder="0"></iframe>
      </div>

    </div>
    </div>

    </div>
    <div id='about' className='w-full flex items-center h-[140vh] sm:h-[70vh] bg-black'>
    <img src={gradientLeft} className='absolute'/>
    <div className='flex w-full flex-col items-center '>
    <h1 className='my-12 text-5xl text-center font-semibold text-white'>
    About Us
    </h1>
    <div className='hidden w-full items-center justify-center my-20 gap-16'>
        <div className='flex flex-col gap-2'>
            <img src={ganesh} className='size-60 rounded-md'/>
            <label className='text-button text-left text-xl font-bold'>
            Ganesh Mohan Pillai
            </label>
            <label className='text-white text-left text-sm'>
            pillaiganeshmohanwork@gmail.com
            </label>
        </div>
        <div className='flex flex-col gap-2'>
            <img src={jannat} className='size-60 rounded-md'/>
            <label className='text-button text-left text-xl font-bold'>
            Jannat Shaikh
            </label>
            <label className='text-white text-left text-sm'>
            jannatshaikh@gmail.com
            </label>
        </div>
        <div className='flex flex-col gap-2'>
            <img src={member} className='size-60 rounded-md'/>
            <label className='text-button text-left text-xl font-bold'>
            Priyanshi Sharma
            </label>
            <label className='text-white text-left text-sm'>
            priyanshi@gmail.com
            </label>
        </div>
        <div className='flex flex-col gap-2'>
            <img src={tejas} className='size-60 rounded-md'/>
            <label className='text-button text-left text-xl font-bold'>
            Tejas Patil
            </label>
            <label className='text-white text-left text-sm'>
            tejaspatil@gmail.com
            </label>
        </div>


    </div>

    <Carousal 
    names={['Ganesh Mohan Pillai', 'Jannat Shaikh', 'Priyanshi Sharma', 'Tejas Patil']}  
    emails={['pillaiganeshmohanwork@gmail.com', 'jannatiqbalsk@gmail.com', 'priyanshi@gmail.com', 'tejaspatil@gmail.com']} 
    linkedIn={['https://www.linkedin.com/in/ganeshmohanpillai','https://www.linkedin.com/in/jannat-shaikh','','']}
    twitter={['https://twitter.com/ganeshmohan1210','https://twitter.com/jannatsk44','','']}
    mail={['mailto:pillaiganeshmohanwork@gmail.com','mailto:jannatiqbalsk@gmail.com','','']}
    instagram={['https://www.instagram.com/_i__am_lucifer','https://www.instagram.com/jannatsk44','','']}
/>


    </div>
    </div>
    <Footer/>
    </>

  )
}

export default Home