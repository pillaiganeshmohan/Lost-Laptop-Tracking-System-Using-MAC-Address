import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import gradientLeft from '../assets/gradientLeft.png'
import gradientRight from '../assets/gradientRight.png'
import bg from '../assets/HomeBG.png'
import axios from 'axios';
import Slider from "./Slider";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/Loader";

function DetailedView() {
  const { id } = useParams(); 
  const [record, setRecord] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState({
    id:'',
    mac_address:''
  })
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
 
  const handleSearch = async (e) => {
    e.preventDefault();
    
    
    setIsLoading(true)
    try {
      const accessToken = JSON.parse(localStorage.getItem('userData')).access_token;
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
  
      const response = await axios.post('http://127.0.0.1:8000/api/update-stolen-laptop-details/', data, { headers });
  
      toast.success('Search Successful', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLoading(false)
      console.log("Report Registered Successfully", response.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      toast.error('Search Unsuccessful', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userData') !== null;
    setIsLoggedIn(userLoggedIn);
    if (!userLoggedIn) {
      navigate('/login-signup', { state: { showSignUp: true } });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = JSON.parse(localStorage.getItem('userData')).access_token;
        const headers = {
          'Authorization': `Bearer ${accessToken}`
        };
        const response = await axios.get(`http://127.0.0.1:8000/api/stolen-laptop-details/`, { headers });
        const fiteredData = response.data.find(item => item.id == id)
        setRecord(fiteredData);
        setData({
          id: id,
          mac_address: fiteredData?.mac_address
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
 
  }, [id]); 


  return (
    <>
      <div className="w-full flex flex-col sm:justify-evenly items-center h-[90vh] sm:h-[30vh] justify-center gap-4 sm:hidden">
          <img src={gradientRight} className='absolute top-[100%] sm:top-[70%] sm:w-1/2 sm:h-1/2 right-0'/>
         <img src={gradientLeft} className='absolute top-[160%] sm:w-1/2 sm:h-1/2 left-0 sm:top-[120%]'/>
         <img src={gradientRight} className='absolute top-[250%] right-0 sm:hidden'/>
        <img
          src={bg}
          alt="Background"
          className="z-0 absolute top-20 w-full h-[90vh] sm:hidden object-fill"
        />
        <h1 className="font-semibold text-[64px] sm:text-4xl leading-[70px] tracking-tight text-white z-10">
          Lost Laptop Tracking System
          <br /> Using MAC Address
        </h1>
        <label className="text-xl text-white z-10">
          “Upgrade your Laptop's Security to the Utopian Level with <br /> Lost
          Laptop Tracking System”
        </label>
      </div>

      <div className="w-full flex flex-col justify-center gap-10 sm:pt-4 pt-[45px] pb-[45px] bg-black">
        
        <h2 className="font-semibold text-[55px] sm:text-4xl tracking-tight text-white z-10">
          Detailed View
        </h2>
        <div className="tableContainer ps-[120px]  sm:ps-[10px] d-flex flex-col items-center sm:justify-evenly justify-center gap-10">
        {
            isLoading && <div className="w-4/5 sm:w-full sm:top-[10%] sm:-ml-4 h-dvh flex absolute top-[200%] items-center justify-center"><Loader label='Searching . . . '/></div>
          }
          {record && (
            <table className="text-white text-[20px] sm:text-[12px] mx-auto mb-12 w-4/5">
              <tbody>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key w-1/2">ID:</td>
                  <td className='text-left'>{record.id}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Full Name:</td>
                  <td className='text-left'>{record.full_name}</td>
                </tr> 
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Aadhaar No:</td>
                  <td className='text-left'>{record.aadhaar_no}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Approximate Time:</td>
                  <td className='text-left'>{record.approximate_time}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Date:</td>
                  <td className='text-left'>{record.date}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Address:</td>
                  <td className='text-left'>{record.address}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Contact No:</td>
                  <td className='text-left'>{record.contact_no}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Brand:</td>
                  <td className='text-left'>{record.brand}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Description:</td>
                  <td className='text-left'>{record.description}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Model No:</td>
                  <td className='text-left'>{record.model_no}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">MAC Address:</td>
                  <td className='text-left'>{record.mac_address}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">IPv4:</td>
                  <td className='text-left'>{record.ipv4?record.ipv4:'-'}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Location:</td>
                  <td className='text-left'>{record.location?record.location:'-'}</td>
                </tr>
                <tr className="h-20 sm:h-10">
                  <td className="font-bold italic text-left font__key">Status:</td>
                  <td className={record.status ? "text-green-500 text-left font-bold" : "text-red-500 text-left font-bold"}>
                    {record.status ? "Found" : "Not Found"}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
          {!record && (
            <h3 className="text-white text-[30px] ">
             Error in Fetching Data
            </h3>
          )}
          <div className="w-full flex justify-evenly">
          <Link className="btn__back bg-button py-4 mt-10 sm:w-1/3 w-1/5 px-4 text-lg sm:text-sm text-white font-bold rounded-lg z-10 d-inline" onClick={() => {
            navigate(-1)
          }}>
            Back
          </Link>
          {!record?.status &&           
          <Link className="btn__back bg-button py-4 mt-10 sm:w-1/3 w-1/5 text-lg sm:text-sm px-2 text-white font-bold rounded-lg z-10 d-inline" onClick={handleSearch}>
            Search Again
          </Link>}

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailedView;
