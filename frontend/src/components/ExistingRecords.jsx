import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";
import axios from 'axios';
import Loader from './Loader'

function ExistingRecords({ myClass }) {
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
        const response = await axios.get('http://127.0.0.1:8000/api/stolen-laptop-details/', { headers });
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    setIsLoading(false)

  }, []);



  const filteredRecords = records.filter(record => {
    return (
      record.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.mac_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.aadhaar_no.toLowerCase().includes(searchTerm.toLowerCase()) 
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
    <div id='records' className={`${myClass} w-full flex flex-col py-20 sm:py-2 items-center justify-center bg-black font-sans`}>
      <div className='w-[90%] flex sm:flex-col items-center my-12 sm:my-0 justify-between'>
        <h1 className='z-20 my-6 text-5xl sm:text-3xl text-center font-semibold sm:w-full text-white'>
          Existing Records
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
            <th className=' whitespace-nowrap'>Police No.</th>
            <th className=' whitespace-nowrap'>Model No.</th>
            <th className=' whitespace-nowrap'>MAC Address </th>
            <th>IPv4</th>
            <th >Location</th>
            <th>Status</th>
            <th className=' whitespace-nowrap'>Detailed View</th>
          </tr>
        </thead>
        
        <tbody>
          {currentRecords.map((record, index) => (
            <tr key={index} className='bg-tableBg h-14 border-8 border-black'>
              <td>{index + 1}</td>
              <td className=' whitespace-nowrap'>{record.full_name}</td>
              <td>{record.aadhaar_no}</td>
              <td>{record.model_no}</td>
              <td>{record.mac_address}</td>
              <td>{record.ipv4? record.ipv4 :'-'}</td>
              <td className='w-1/4'>{record.location?record.location:'-'}</td>
              <td>{record.status ? <span className='text-green-400'>Found</span> : <span className='text-red-400'>Not Found</span>}</td>
              <td><Link to={`/details/${record.id}`} className='hover:underline'>View Details</Link></td>
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
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Aadhaar No.</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.aadhaar_no}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Model no.</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.model_no}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Mac Address</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.mac_address}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>IPv4</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.ipv4? record.ipv4 :'-'}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Location</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.location?record.location:'-'}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Status</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 p-1'>{record.status ? <span className='text-green-400'>Found</span> : <span className='text-red-400'>Not Found</span>}</div>
        </div>

        <div className='w-full flex'>
          <div className='w-1/3 bg-button text-left text-white font-bold m-1 p-1'>Detail View</div>
          <div className='w-2/3 text-white font-semibold bg-[#121212] text-left m-1 underline p-1'><Link to={`/details/${record.id}`} className='hover:underline'>View Details</Link></div>
        </div>
      
      </div>
      <hr className='w-1/2 h-2 my-4 hidden sm:flex'/>
      </> 
       ))} 

      <div className="pagination text-white text-xl flex w-[90%] justify-end">
        <span className='font-semibold'>{`${indexOfFirstRecord + 1} - ${Math.min(indexOfLastRecord, filteredRecords.length)} `}</span><span className='text-white text-xl'>&nbsp;of {filteredRecords.length}</span>
        <button className=' text-button ml-6 font-semibold' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
        <button className=' text-button ml-6 font-semibold' onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>{'>'}</button>
      </div>
      </> }  
    </div>
  );
}

export default ExistingRecords;
