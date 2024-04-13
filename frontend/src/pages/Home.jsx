import React from 'react'
import bg from '../assets/HomeBG.png'
import { Link } from 'react-router-dom'
import work from '../assets/p1.png'
import gradientLeft from '../assets/gradientLeft.png'
import gradientRight from '../assets/gradientRight.png'
import rect from '../assets/Rectangle.png'
import ganesh from '../assets/ganesh.png'
import jannat from '../assets/Jannat.png'
import member from '../assets/member.png'
import tejas from '../assets/Tejas.png'
import Footer from '../components/Footer'

function Home() {
    return (
        <>
            <div className='w-full flex flex-col items-center h-[90vh] justify-center gap-4'>
                <img src={bg} className='z-0 absolute top-20 w-full h-[90vh] object-fill' />
                <h1 className='font-semibold text-[64px] leading-[70px] tracking-tight text-white z-10'>Lost Laptop Tracking System<br /> Using MAC Address</h1>
                <label className='text-xl text-white z-10'>“Upgrade your Laptop's Security to the Utopian Level with <br /> Lost Laptop Tracking System”</label>
                <Link className='bg-button py-4 mt-4 px-10 text-xl text-white italic rounded-lg z-10'>Get Started</Link>
            </div>
            <div className='w-full flex h-[100vh] bg-black gap-3'>
                <img src={gradientLeft} className='absolute' />
                <div className='w-1/2  flex-col items-center justify-center gap-6 flex'>

                    <h1 className='w-4/5 text-6xl text-left font-bold tracking-tight text-white'>One step solution<br /> for a complete<br /> protection of your<br /> device</h1>
                    <label className='w-4/5 text-left text-xl tracking-tight text-white'>With some amazing features in hand, rest assured about the security of your personal information from the eyes of those malicious hackers. Our Lost Laptop Tracking System has been equipped with all that's necessary to keep your device fully secure, all at the comfort of your fingertips!</label>
                </div>
                <div className='w-1/2 flex items-center justify-start' >

                    <div className='w-11/12 items-start justify-start'>
                        <img src={work} className=' object-fill w-full' />
                    </div>
                </div>

            </div>
            <div className='w-full flex  h-[100vh] bg-black justify-end'>
                <img src={gradientRight} className='absolute w-1/4 h-4/5' />
                <div className='flex w-full flex-col items-center'>
                    <h1 className='my-6 text-5xl text-center font-semibold text-white'>
                        Walkthrough
                    </h1>
                    <div className='flex flex-col w-full gap-6'>
                        <div className='flex w-full justify-evenly'>
                            <div className='bg-cardBg p-4 flex flex-col rounded-lg border-button items-start gap-2'>
                                <div className='w-full flex items-center justify-center'>
                                    <img src={rect} />
                                </div>
                                <label className='text-xl font-semibold text-white'>Step 1</label>
                                <label className='text-lg text-white'>Details</label>
                            </div>
                            <div className='bg-cardBg p-4 flex flex-col rounded-lg border-button items-start gap-2'>
                                <div className='w-full flex items-center justify-center'>
                                    <img src={rect} />
                                </div>
                                <label className='text-xl font-semibold text-white'>Step 1</label>
                                <label className='text-lg text-white'>Details</label>
                            </div>
                            <div className='bg-cardBg p-4 flex flex-col rounded-lg border-button items-start gap-2'>
                                <div className='w-full flex items-center justify-center'>
                                    <img src={rect} />
                                </div>
                                <label className='text-xl font-semibold text-white'>Step 1</label>
                                <label className='text-lg text-white'>Details</label>
                            </div>
                        </div>
                        <div className='flex w-full justify-evenly'>
                            <div className='bg-cardBg p-4 flex flex-col rounded-lg border-button gap-2'>
                                <div className='w-full flex items-center justify-center'>
                                    <img src={rect} />
                                </div>
                                <label className='text-xl font-semibold text-left text-white'>Step 1</label>
                                <label className='text-lg text-left text-white'>Details</label>
                            </div>
                            <div className='bg-cardBg p-4 flex flex-col rounded-lg border-button items-start gap-2'>
                                <div className='w-full flex items-center justify-center'>
                                    <img src={rect} />
                                </div>
                                <label className='text-xl font-semibold text-white'>Step 1</label>
                                <label className='text-lg text-white'>Details</label>
                            </div>
                            <div className='bg-cardBg p-4 flex flex-col rounded-lg border-button items-start gap-2'>
                                <div className='w-full flex items-center justify-center'>
                                    <img src={rect} />
                                </div>
                                <label className='text-xl font-semibold text-white'>Step 1</label>
                                <label className='text-lg text-white'>Details</label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-full flex items-center h-[80vh] bg-black'>
                <img src={gradientLeft} className='absolute' />
                <div className='flex w-full flex-col items-center '>
                    <h1 className='mt-6 text-5xl text-center font-semibold text-white'>
                        About Us
                    </h1>
                    <div className='flex w-full items-center justify-center my-20 gap-16'>
                        <div className='flex flex-col gap-2'>
                            <img src={ganesh} className='size-60 rounded-md' />
                            <label className='text-button text-left text-xl font-bold'>
                                Ganesh Mohan Pillai
                            </label>
                            <label className='text-white text-left text-sm'>
                                pillaiganeshmohanwork@gmail.com
                            </label>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <img src={jannat} className='size-60 rounded-md' />
                            <label className='text-button text-left text-xl font-bold'>
                                Jannat Shaikh
                            </label>
                            <label className='text-white text-left text-sm'>
                                jannatshaikh@gmail.com
                            </label>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <img src={member} className='size-60 rounded-md' />
                            <label className='text-button text-left text-xl font-bold'>
                                Priyanshi Sharma
                            </label>
                            <label className='text-white text-left text-sm'>
                                priyanshi@gmail.com
                            </label>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <img src={tejas} className='size-60 rounded-md' />
                            <label className='text-button text-left text-xl font-bold'>
                                Tejas Patil
                            </label>
                            <label className='text-white text-left text-sm'>
                                tejaspatil@gmail.com
                            </label>
                        </div>


                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Home