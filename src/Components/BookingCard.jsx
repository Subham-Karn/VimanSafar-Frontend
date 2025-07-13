import React, { useState } from 'react'
import { BookingDeatils } from '../util/consts'

const BookingCard = () => {
const [isActive , setIsActive] = useState(false)
const [type , setType] = useState('Flights')
alert(type)
  return (
    <div className='bg-white shadow-md rounded-lg p-4'>
      {/* Header Section */}
      <div className='flex items-center justify-between border-b border-gray-200 pb-4'>
         {BookingDeatils.map((item, index) => (
            <div onClick={() =>{ 
              setType(item.name)
              setIsActive(!isActive)
              }} className='flex flex-col items-center text-gray-500' key={index}>
                <span>{item.icon}</span>
                <span>{item.name}</span>
            </div>
         ))}
      </div>
      {/* Content Section */}
       
    </div>
  )
}

export default BookingCard
