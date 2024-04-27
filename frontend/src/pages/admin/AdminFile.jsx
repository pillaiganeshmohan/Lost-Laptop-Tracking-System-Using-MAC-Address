import React, { useState } from 'react';
import cloud from '../../assets/Upload to Cloud.png';
import remove from '../../assets/Delete1.png';
import axios from 'axios'; 
import { ToastContainer, toast } from "react-toastify";
import Loader from '../../components/Loader';
import {Link, useNavigate } from 'react-router-dom';
import AdminNav from '../../components/AdminNav'
import Footer from '../../components/Footer';


function AdminFile() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }


  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const uploadFiles = async () => {
    try {
        setIsLoading(true)
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('pcap_files', file);
      });
      await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSelectedFiles([]);
      toast.success(`Files Uploaded Successfully:`, {
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
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error(`Error uploading files`, {
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

    }
  };

  return (
    <>
      <AdminNav/>
    <div className="w-full h-[90%] flex flex-col font-montserrat items-center justify-center bg-black ">
      <div className="flex flex-col w-11/12 shadow-lg shadow-button border-button border-2 p-4 rounded-2xl items-center">
        <label
          htmlFor="fileInput"
          className="flex flex-col items-center justify-center p-4 bg-purple-950 rounded-lg mt-2  border-2 border-button  w-full gap-2 cursor-pointer"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <img src={cloud} alt="Upload Icon" />
          <div className="text-xl font-bold text-white">Browse File</div>
          <div className="text-white">or Drop Pcap Files</div>
          <input
            type="file"
            id="fileInput"
            multiple="multiple"
            accept=".pcap"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </label>
        <label className="flex justify-start mt-6 mb-2 text-white  text-left w-full" > Selected Files</label>
        <div className="w-full flex flex-col gap-2 max-h-[30vh] items-start overflow-auto ">
            
            {
                isLoading &&
                <div className='w-full h-full flex items-center justify-center'>
            <Loader label='Uploading...'/>
            </div>

            }
            {selectedFiles.length === 0 && (
            <div className="w-full py-2 px-2 bg-purple-950 border-button border-2 rounded-lg flex justify-between items-center">
              <p className="w-full text-white">No files selected</p>
            </div>
          )}
       
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              className="w-[98.5%] sm:w-[97%] py-2  px-2 bg-purple-950  border-button border-2 rounded-lg flex  justify-between items-center ml-2"
            >
              <p className="w-11/12 flex justify-start text-white text-left">{file.name}</p>
              <img
                src={remove}
                className="w-8 cursor-pointer"
                alt="Remove Icon"
                onClick={() => removeFile(index)}
              />
            </div>
          ))}

        </div>
        <div className='w-full flex sm:gap-2 justify-evenly'>
        <Link
          className="bg-button mt-10 text-white text-xl font-semibold hover:bg-purple-950 hover:border-2 hover:border-button  px-2 py-3 rounded-xl w-1/6 sm:w-1/2"
          onClick={handleBack}
          disabled={selectedFiles.length === 0} 
        >
          Back
        </Link>
        <button
          className={`${selectedFiles.length !== 0?'cursor-pointer':'cursor-not-allowed'} bg-button mt-10 text-white text-xl font-semibold hover:bg-purple-950 hover:border-2 hover:border-button  px-2 py-3 rounded-xl w-1/6 sm:w-1/2`}
          onClick={uploadFiles}
          disabled={selectedFiles.length === 0} 
        >
          Upload Files
        </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>

  );
}

export default AdminFile;
