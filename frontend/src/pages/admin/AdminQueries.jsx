import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import axios from 'axios';
import Loader from '../../components/Loader'
import { ToastContainer, toast } from "react-toastify";
import Footer from '../../components/Footer'
import AdminNav from '../../components/AdminNav'

function UserApproval({ myClass }) {
  const [searchIconTouched, setSearchIconTouched] = useState(false);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const recordsPerPage = 7;
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const accessToken = JSON.parse(localStorage.getItem('userData')).access_token;
        const headers = {
          'Authorization': `Bearer ${accessToken}`
        };
        const response = await axios.get('http://127.0.0.1:8000/api/contactus/',);
        const filteredData = response.data
        setRecords(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setIsLoading(false)

  }, [records]);

  
  const filteredRecords = records.filter(record => {
    return (
      record?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(record?.contact_no).toLowerCase().includes(searchTerm.toLowerCase()) ||
      record?.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  });

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = pageNumber => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
     <AdminNav/>
    <div className={`${myClass} w-full flex flex-col py-4 sm:py-2 items-center justify-center bg-black font-sans`}>
       
      <div className='w-[90%] flex sm:flex-col items-center my-12 sm:my-0 justify-between'>
        <h1 className='z-20 my-6 text-5xl sm:text-3xl text-center font-semibold sm:w-full text-white'>
          Users' Queries
        </h1>
        
        <div
          onMouseEnter={() => setSearchIconTouched(true)}
          onMouseLeave={() => setSearchIconTouched(false)}
          className="box123 sm:w-full bg-button flex justify-center sm:mb-14  rounded-2xl transition-all duration-300 ease-in-out"
        >
          <div className="box bg-button flex cursor-pointer p-3  sm:px-3 sm:py-1 rounded-2xl w-fit justify-between hover:w-full sm:w-full transition-all duration-300 ease-in-out">
            <IoSearchSharp className='size-8 text-white'/>
            <input
              type="search"
              className={`${searchIconTouched ? 'w-full' : 'w-1 sm:w-full'} search-input bg-button focus:outline-none pl-1 text-white `}
              id="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      
      </div>
   {isLoading && <Loader label='Loading...'/>}
    {!isLoading && 
    <>
      <table className='w-11/12 text-white sm:hidden'>
        <thead className='bg-button'>
          <tr className='border-black border-8 h-14'>
            <th className=' whitespace-nowrap'>Sr no.</th>
            <th>Name</th>
            <th>Email</th>
            
            <th className=' whitespace-nowrap'>Contact No.</th>
 
            <th >Query</th>
          
          </tr>
        </thead>
        
        <tbody>
          {currentRecords.map((record, index) => (
            <tr key={index} className='bg-tableBg h-14 border-8 border-black'>
              <td>{index + 1}</td>
              <td className=' whitespace-nowrap'>{record.full_name}</td>
              <td>{record.email}</td>
              <td>{record.contact_us? record.contact_us:'-'}</td>
              <td className='w-1/3'>{record.query}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
      
      {currentRecords.map((record, index) => (
       <> 
      <div key={index} className='w-11/12 flex-col hidden sm:flex'>
      
        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Sr no.</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{index + 1}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Name</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.full_name}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Email</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.email}</div>
        </div>
        

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Contact No.</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.contact_us}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Query</div>
          <div className=' bg-[#121212] flex items-center text-white font-semibold tracking-tighter text-justify justify-start w-2/3 m-1 p-1'>{record.query}</div>
        </div>

      
      </div>
      <hr className='w-1/2 h-2 my-4 hidden sm:flex'/>
      </> 
       ))} 

      <div className="pagination text-white text-xl flex w-[90%] justify-end mb-10">
        <span className='font-semibold'>{`${indexOfFirstRecord + 1} - ${Math.min(indexOfLastRecord, filteredRecords.length)} `}</span><span className='text-white text-xl'>&nbsp;of {filteredRecords.length}</span>
        <button className=' text-button ml-6 font-semibold' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
        <button className=' text-button ml-6 font-semibold' onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
      </div>
      </> }
      <Footer/>  
    </div>
    </>
  );
}

export default UserApproval;
