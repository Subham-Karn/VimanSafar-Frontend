import React, { useState } from 'react';
import { CalendarClock, MapPinned, Users, BusFront } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Bus = () => {
  const [busDetails, setBusDetails] = useState({
         from: '',
         to: '',
         departure: '',
         passengers: 1
       });

      const handleChanges = (e) =>{
      const {name, value} = e.target;
      setBusDetails((prev) => ({...prev, [name]: value}));
    } 
    const navigate = useNavigate();
    const handleSearch = () =>{
      if(!busDetails.from || !busDetails.to || !busDetails.departure || !busDetails.passengers){
        alert('Please fill in all required fields.');
      }else{
        navigate('/bus/search?=result', {state: busDetails});
      }
    }
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg  mt-6 space-y-6">
      {/* Bus Booking Details */}

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Location */}
        <div className="flex items-center space-x-3">
          <span className="text-[#d72f18]">
            <MapPinned size={24} />
          </span>
          <div className="w-full">
            <label htmlFor="bus_from" className="block text-sm font-medium text-gray-700">From</label>
            <input
              name='from'
              value={busDetails.from}
              onChange={handleChanges}
              type="text"
              id="bus_from"
              placeholder="Enter departure city"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* To Location */}
        <div className="flex items-center space-x-3">
          <span className="text-[#d72f18]">
            <MapPinned size={24} />
          </span>
          <div className="w-full">
            <label htmlFor="bus_to" className="block text-sm font-medium text-gray-700">To</label>
            <input
              name='to'
              value={busDetails.to}
              onChange={handleChanges}
              type="text"
              id="bus_to"
              placeholder="Enter destination city"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="flex items-center space-x-3">
          <span className="text-[#d72f18]">
            <CalendarClock size={24} />
          </span>
          <div className="w-full">
            <label htmlFor="bus_departure" className="block text-sm font-medium text-gray-700">Departure</label>
          <input
            type="date"
            name='departure'
            value={busDetails.departure}
            onChange={handleChanges}
            id="bus_departure"
            className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
          />
          </div>
        </div>

        {/* Travelers */}
        <div className="flex items-center space-x-3">
          <span className="text-[#d72f18]">
            <Users size={24} />
          </span>
          <div className="w-full">
            <label htmlFor="bus_travelers" className="block text-sm font-medium text-gray-700">Travelers</label>
            <input
              type="number"
              name='passengers'
              value={busDetails.passengers}
              onChange={handleChanges}
              id="bus_travelers"
              placeholder="Number of passengers"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button onClick={handleSearch} className="w-full bg-[#d72f18] text-white px-4 py-2 rounded-md hover:bg-[#b52011] transition">
          Search Buses
        </button>
      </div>
    </div>
  );
};

export default Bus;
