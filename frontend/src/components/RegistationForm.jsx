import React, {useState, useEffect} from 'react'
import gradientLeft from '../assets/gradientLeft.png'
import gradientRight from '../assets/gradientRight.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import Loader from './Loader'

function RegistationForm({myClass}) {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") return "";
        return prevDots + ".";
      });
    }, 500);
    return () => clearInterval(intervalId);
  }, []);


  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [macAddress, setMacAddress] = useState('')
  const [userId, setUserId] = useState('')
  const [aadhaarError, setAadhaarError] = useState('');
  const [contactError, setContactError] = useState('');
  const [macAddressError, setMacAddressError] = useState('');
  const [dateError, setDateError] = useState('')
  const [fullNameError, setFullNameError] = useState('')
  const [approximateTimeError, setApproximateTimeError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const [modelError, setModelError] = useState('')


  const [isValid, setIsValid] = useState(true)

  const [data, setData] = useState({
    id:'',
    mac_address:''
  })
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    full_name: '',
    aadhaar_no: '',
    approximate_time: '',
    date: '',
    address: '',
    contact_no: '',
    brand: '',
    description: '',
    model_no: '',
    mac_address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    

    if (name === 'aadhaar_no') { 
      if (!/^\d{12}$/.test(value)) {
        setAadhaarError('*Aadhaar must be 12 digits');
        console.log(aadhaarError)
      } else {
        setAadhaarError('');
      }
    }

    if (name === 'contact_no') { 
      if (!/^\d{10}$/.test(value)) {
        setContactError('*Contact must be 10 digits');
      } else {
        setContactError('');
      }
    }

    if (name === 'mac_address') { 
      if (!/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9a-fA-F]{4}\\.[0-9a-fA-F]{4}\\.[0-9a-fA-F]{4})$/.test(value)) {
        setMacAddressError('Mac Address must be 17 digits')
      }
      else{
        setMacAddressError('')
      }


    }
    if (name === 'date') { 
      if (!/^\d{4}-\d{2}-\d{2}/.test(formData.date.trim())) {
        setDateError('Date must be in YYYY-MM-DD format');
    }
      else{
        setDateError('')
      }
    }
  };

  

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
      navigate(`/details/${data.id}`)
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
      navigate(`/details/${data.id}`)
    }
  };
  
  const handleChange = (newDate) => {
    setFormData({date: newDate});
  };

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setFormData({
      ...formData,
      brand: selectedBrand
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const requiredFields = ['full_name', 'aadhaar_no', 'approximate_time', 'date', 'address', 'contact_no', 'brand', 'description', 'model_no', 'mac_address'];
    const emptyFieldErrors = {};
    requiredFields.forEach(field => {
      if (formData[field] === '')  {
        emptyFieldErrors[field] = `${field.replace('_', ' ').charAt(0).toUpperCase() + field.replace('_', ' ').slice(1)} is required`;

      }
    });
  
    if (Object.keys(emptyFieldErrors).length > 0) {
      setAadhaarError(emptyFieldErrors.aadhaar_no || '');
      setContactError(emptyFieldErrors.contact_no || '');
      setDateError(emptyFieldErrors.date || '' );
      setFullNameError(emptyFieldErrors.full_name || '');  
      setApproximateTimeError(emptyFieldErrors.approximate_time || '' );
      setAddressError(emptyFieldErrors.address || '' );
      setDescriptionError(emptyFieldErrors.description || '' );
      setModelError(emptyFieldErrors.model_no || '' );
      setMacAddressError(emptyFieldErrors.mac_address || '' );

      return;
    }


    try {
      const accessToken = JSON.parse(localStorage.getItem('userData')).access_token;
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      };
        const response = await axios.post('http://127.0.0.1:8000/api/stolen-laptop-details/', formData, { headers });
  
      toast.success('Report Registered Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
      console.log("Report Registered Successfully", response.data);
      setData({id: response.data.id, mac_address: response.data.mac_address})
      console.log(data)
      setIsRegistered(true)
    } catch (error) {
      console.log(error);
    }

  };
  
  return (
    <div className={`${myClass} w-full flex items-center justify-center flex-col sm:justify-between sm:gap-4 bg-black`}>
         
         {
            isLoading && <Loader label='Searching . . . '/>
          }
        {!isLoading && <> <img src={gradientLeft} className='absolute top-[160%] sm:w-1/2 sm:h-1/2 left-0 sm:top-[120%]'/>
        <img src={gradientRight} className='absolute top-[100%] sm:top-[70%] sm:w-1/2 sm:h-1/2 right-0'/>
         <img src={gradientRight} className='absolute top-[200%] right-0 sm:hidden'/></>}
         
         

            <form className='w-3/5 sm:w-full bg-black flex flex-col items-center justify-center' onSubmit={handleSubmit}>
            <h1 className='z-20 my-14 text-5xl sm:text-3xl text-center font-semibold text-white'>
         Registration Form</h1>
         <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>Full Name</label> 
           {fullNameError && <span className='text-red-500'>{fullNameError}</span>}
         </label>
           <input
         type='text'
         name='full_name'
         value={formData.full_name}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white focus:outline-none'
         placeholder='Enter your Name'
       />
           
           <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>Aadhaar No</label> 
           {aadhaarError && <span className='text-red-500'>{aadhaarError}</span>}
           </label>
           
           <input
         type='text'
         name='aadhaar_no'
         value={formData.aadhaar_no}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
         placeholder='Enter Aadhaar no.'
       />
      
           
           <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>Approximate Time</label> 
           {approximateTimeError && <span className='text-red-500'>{approximateTimeError}</span>}
         </label>
           <input
         type='text'
         name='approximate_time'
         value={formData.approximate_time}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
         placeholder='Enter Time'
       />
       

           
           <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>Date</label> 

           {dateError && <span className='text-red-500'>{dateError}</span>}
             
           </label>
           
           <input
         type='text'
         name='date'
         value={formData.date}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
         placeholder='YYYY-MM-DD'
       />


       
           
           <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>Address</label> 
           {addressError && <span className='text-red-500'>{addressError}</span>}
         </label>
           <input
         type='text'
         name='address'
         value={formData.address}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
         placeholder='Enter Address'
       />
           
           <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>Mobile No.</label> 
           {contactError && <span className='text-red-500'>{contactError}</span>}
           </label>
           <input
         type='text'
         name='contact_no'
         value={formData.contact_no}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
         placeholder='Enter Mobile No'/>
           
           <label className='text-white w-full  text-left text-xl font-bold'>Brand</label> 
           <select
         className='bg-black py-2 mb-4 w-full sm:w-full z-20  text-white border-b-2 border-white focus:outline-none'
         id="laptopBrands"
         name="brand"
         value={formData.brand}
         onChange={handleBrandChange}
       >        
               <option value="" className='w-1/2 text-md'>Select a brand</option>
               <option value="Apple" className='w-1/2 text-md'>Apple</option>
               <option value="Dell" className='w-1/2 text-md'>Dell</option>
               <option value="HP" className='w-1/2 text-md'>HP (Hewlett-Packard)</option>
               <option value="Lenovo" className='w-1/2 text-md'>Lenovo</option>
               <option value="Asus" className='w-1/2 text-md'>Asus</option>
               <option value="Acer" className='w-1/2 text-md'>Acer</option>
               <option value="Microsoft" className='w-1/2 text-md'>Microsoft</option>
               <option value="MSI" className='w-1/2 text-md'>MSI (Micro-Star International)</option>
               <option value="Razer" className='w-1/2 text-md'>Razer</option>
               <option value="Samsung" className='w-1/2 text-md'>Samsung</option>
               <option value="Other" className='w-1/2 text-md'>Other</option>

           </select>
           <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>Description</label> 
           {descriptionError && <span className='text-red-500'>{descriptionError}</span>}
         </label>
           <input
         type='text'
         name='description'
         value={formData.description}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
         placeholder='Enter Descrition'
       />
           
           <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>Model No</label> 
           {modelError && <span className='text-red-500'>{modelError}</span>}
         </label>
           <input
           
         type='text'
         name='model_no'
         value={formData.model_no}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
         placeholder='Enter Model No'/>
           
           <label className='w-full flex justify-between'>
           <label className='text-white text-left text-xl font-bold'>MAC Address</label> 
           {macAddressError && <span className='text-red-500'>{macAddressError}</span>}
         </label>
           <input
           
         type='text'
         name='mac_address'
         value={formData.mac_address}
         onChange={handleInputChange}
         className='bg-black w-full py-2 mb-4 text-white border-b-2 border-white  focus:outline-none'
        placeholder='Enter  MAC Address'/>
         { !isRegistered &&
           <button className='w-1/4 sm:w-1/2 bg-button py-4 my-8 px-10 text-xl text-white italic rounded-lg z-10' type='submit'>Submit</button>
         }
         { isRegistered &&
           <button onClick={handleSearch} className='w-1/4 sm:w-1/2 bg-button py-4 my-8 px-6 text-xl text-white italic rounded-lg z-10'>Search Now</button>
         }
   
         </form>
        
         
     
          
        
    </div>
  )
}

export default RegistationForm