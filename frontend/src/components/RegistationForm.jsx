import React from 'react'
import gradientLeft from '../assets/gradientLeft.png'
import gradientRight from '../assets/gradientRight.png'

function RegistationForm({myClass}) {
  return (
    <div className={`${myClass} w-full flex items-center justify-center flex-col bg-black1`}>
         <img src={gradientRight} className='absolute top-[100%] right-0'/>
         <img src={gradientLeft} className='absolute top-[160%] left-0'/>
         <img src={gradientRight} className='absolute top-[200%] right-0'/>
          <h1 className='z-20 my-6 text-5xl text-center font-semibold text-white'>
          Registation Form</h1>
          <form className='w-3/5 flex flex-col items-center justify-center'>
            <label className='text-white w-full text-left text-xl font-bold'>Full Name</label> 
            <input className='bg-black  w-full py-2 mb-4 text-white border-b-2 border-white' placeholder='Enter your Name'/>
            <label className='text-white  w-full text-left text-xl font-bold'>Aadhaar No</label> 
            <input type='number' className='bg-black w-full  py-2 mb-4 text-white border-b-2 border-white' placeholder='Enter your Aadhaar Number'/>
            <label className='text-white  w-full text-left text-xl font-bold'>Approximate Time</label> 
            <div className='w-full flex border-b-2 py-2 mb-4 border-white'>
            <input type='time' className='bg-black   text-white ' placeholder='Enter you Name'/>
            <input type='time' className='bg-black  text-white border-white' placeholder='Enter you Name'/> 
            </div>
            <label className='text-white w-full  text-left text-xl font-bold'>Date</label> 
            <input type='date' className='bg-black w-full py-2 mb-4 text-white border-b-[1px] border-white'/>
            <label className='text-white  w-full text-left text-xl font-bold'>Address</label> 
            <input className='bg-black w-full  py-2 mb-4 text-white border-b-2 border-white' placeholder='Enter your Name'/>
            <label className='text-white  w-full text-left text-xl font-bold'>Mobile No</label> 
            <input type='number' className='bg-black w-full  py-2 mb-4 text-white border-b-2 border-white' placeholder='Enter Mobile No'/>
            <label className='text-white w-full  text-left text-xl font-bold'>Brand</label> 
            <select className='bg-black py-2 mb-4 w-full  text-white border-b-2 border-white' id="laptopBrands">
                <option value="">Select a brand</option>
                <option value="Apple">Apple</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP (Hewlett-Packard)</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Asus">Asus</option>
                <option value="Acer">Acer</option>
                <option value="Microsoft">Microsoft</option>
                <option value="MSI">MSI (Micro-Star International)</option>
                <option value="Razer">Razer</option>
                <option value="Samsung">Samsung</option>
                <option value="Other">Other</option>

            </select>
            <label className='text-white w-full  text-left text-xl font-bold'>Description</label> 
            <input className='bg-black py-2 w-full  mb-4 text-white border-b-2 border-white' placeholder='Enter your Name'/>
            <label className='text-white w-full  text-left text-xl font-bold'>Model No</label> 
            <input className='bg-black py-2 mb-4 w-full text-white border-b-2 border-white' placeholder='Enter Model No'/>
            <label className='text-white w-full  text-left text-xl font-bold'>MAC Address</label> 
            <input className='bg-black w-full  py-2 mb-4 text-white border-b-2 border-white' placeholder='Enter  MAC Address'/>
            <button className='w-1/4 bg-button py-4 my-8 px-10 text-xl text-white italic rounded-lg z-10' type='submit'>Submit</button>
          </form>
        
    </div>
  )
}

export default RegistationForm