import React from 'react'
import { Link } from 'react-router-dom'

function ExistingRecords({myClass}) {
  return (
    <div className={`${myClass} w-full flex flex-col py-20 items-center justify-center bg-black`}>
         <h1 className='z-20 my-6 text-5xl text-center font-semibold text-white'>
          Existing Records</h1>
          <table className='w-11/12 text-white'>
            <thead className=' bg-button '>
                <tr className='border-black border-8 h-14'>
                    <th>Sr no.</th>
                    <th>Name</th>
                    <th>Police No.</th>
                    <th>Model No.</th>
                    <th>MAC Address </th>
                    <th>IPv4</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Detailed View</th>

                </tr>
               
            </thead>
            <tbody>
                 <tr className='bg-tableBg h-14 border-8 border-black'>
                    <td>1</td>
                    <td>Ganesh Mohan</td>
                    <td>1234</td>
                    <td>As123</td>
                    <td>12:c4:e3:13:65:11</td>
                    <td>192.168.2.9</td>
                    <td>Chembur, Mumbai</td>
                    <td className='text-green-400'>Found</td>
                    <td><Link className='hover:underline'>View Details</Link></td>

                </tr>
               
                 <tr className='bg-tableBg border-8 h-14 border-black'>
                    <td>2</td>
                    <td>Jannat Shaikh</td>
                    <td>1234</td>
                    <td>As123</td>
                    <td>12:c4:e3:13:65:11</td>
                    <td>192.168.2.9</td>
                    <td>Mumbra, Thane</td>
                    <td className='text-red-400'>Not Found</td>
                    <td><Link className='hover:underline'>View Details</Link></td>

                </tr>
            </tbody>
          </table>
    </div>
  )
}

export default ExistingRecords