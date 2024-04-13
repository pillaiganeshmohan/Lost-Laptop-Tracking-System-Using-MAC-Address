import React, { useState } from 'react'
import bg from '../assets/HomeBG.png'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function DetailedView() {

    // Table data will be stored in the 'data' state
    // do changes accordingly after fetching the data from the database
    
    const [data, setData] = useState(
        {
            "Full Name": "Ganesh Mohan Pillai",
            "Aadhar No": "12309874567",
            "Police No": "16537AB",
            "Time": "12:04 AM - 06:00 PM",
            "Date": "06/09/2023",
            "Address": "R.NO.E-1 Motilal Society, P.L.L.Marg Chembur Mumbhai-40089",
            "Phone No": "9136247119",
            "Description": "Black Color Laptop, i7-9th gen, 16GB RAM, 1TB+256 SSD, 4GB Graphics Card,  Legion",
            "Brand": "LENOVO",
            "Model No": "Xvujne572",
            "MAC Address": "1234:3568:6794:8940",
            "IPV4": "197.165.20.9",
            "Location": "Chembur, Mumbai",
            "Status": "Found"
        }
    );

    console.log(data);


    return (
        <>
            <div className='w-full flex flex-col items-center h-[90vh] justify-center gap-4'>
                <img src={bg} className='z-0 absolute top-20 w-full h-[90vh] object-fill' />
                <h1 className='font-semibold text-[64px] leading-[70px] tracking-tight text-white z-10'>Lost Laptop Tracking System<br /> Using MAC Address</h1>
                <label className='text-xl text-white z-10'>“Upgrade your Laptop's Security to the Utopian Level with <br /> Lost Laptop Tracking System”</label>
                <div className='h-[80px]'></div>
            </div>

            <div className='w-full flex flex-col justify-center gap-10 pt-[45px] pb-[45px] bg-black'>
                <h2 className='font-semibold text-[55px] tracking-tight text-white z-10' >Detailed View</h2>
                <div className='ps-[120px] d-flex flex-col items-center justify-center gap-10'>
                    {data &&
                        (<table className='text-white text-[20px] mx-auto'>
                            <tbody>
                                {Object.entries(data).map(([key, value]) => (
                                    <tr key={key} className='leading-[80px]'>
                                        <td className='w-[200px] font-extrabold italic font-italic text-left'>{key}<span className='float-right'>:</span></td>
                                        <td className={`${key === "Status" ? "ps-[100px] text-left text-green-500" : "ps-[100px] text-left"}`}>{value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>)}
                    {!data &&
                        <h3 className='text-white text-[30px] '>Fetching Data | Error in Fetching Datra</h3>
                    }
                    <Link className='bg-button py-4 mt-4 px-10 text-xl text-white font-bold rounded-lg z-10'>Back</Link>
                    <svg className="splash" width="311" height="585" viewBox="0 0 311 585" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_f_531_1107)">
                            <circle cx="18.5" cy="292.5" r="81.5" fill="#8350DF"/>
                        </g>
                        <defs>
                            <filter id="filter0_f_531_1107" x="-274" y="0" width="585" height="585" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                <feGaussianBlur stdDeviation="105.5" result="effect1_foregroundBlur_531_1107"/>
                            </filter>
                        </defs>
                    </svg>
                    <svg className='splash2' width="279" height="577" viewBox="0 0 279 577" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_531_812)">
                    <circle cx="321.5" cy="255.5" r="110.5" fill="#8350DF"/>
                    </g>
                    <defs>
                    <filter id="filter0_f_531_812" x="0" y="-66" width="643" height="643" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="105.5" result="effect1_foregroundBlur_531_812"/>
                    </filter>
                    </defs>
                    </svg>

                    <svg className='splash3' width="279" height="577" viewBox="0 0 279 577" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_f_531_812)">
                    <circle cx="321.5" cy="255.5" r="110.5" fill="#8350DF"/>
                    </g>
                    <defs>
                    <filter id="filter0_f_531_812" x="0" y="-66" width="643" height="643" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="105.5" result="effect1_foregroundBlur_531_812"/>
                    </filter>
                    </defs>
                    </svg>
                </div>
            </div>
            <Footer></Footer>


        </>
    )
}

export default DetailedView;