import { CalendarClock, MapPinned, TrainFront, Users } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Trains = () => {
    const navigate = useNavigate(); 
    const [trainDetails, setTrainDetails] = useState({
      from: '',
      to: '',
      departure: '',
      passengers: 1
    });

    const handleChanges = (e) =>{
      const {name, value} = e.target;
      setTrainDetails((prev) => ({...prev, [name]: value}));
    } 

    const handleSearch = () =>{
      if(!trainDetails.from || !trainDetails.to || !trainDetails.departure || !trainDetails.passengers){
        alert('Please fill in all required fields.');
      }else{
        navigate('/trains/search?=result', {state: trainDetails});
      }
    }
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg  mt-6 space-y-6">
      {/* Train Booking Details */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Location */}
        <div className="flex items-center space-x-3">
          <span className="text-[#d72f18]">
            <MapPinned size={24} />
          </span>
          <div className="w-full">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="text"
              id="from"
              name="from"
              placeholder="Enter departure station"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
              value={trainDetails.from}
              onChange={handleChanges}
            />
          </div>
        </div>

        {/* To Location */}
        <div className="flex items-center space-x-3">
          <span className="text-[#d72f18]">
            <MapPinned size={24} />
          </span>
          <div className="w-full">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
            <input
             value={trainDetails.to}
             onChange={handleChanges}
              type="text"
              name="to"
              id="to"
              placeholder="Enter destination station"
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
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700">Departure</label>
            <input
              value={trainDetails.departure}
              onChange={handleChanges}
              type="date"
              name="departure"
              id="departure"
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
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">Travelers</label>
            <input
              value={trainDetails.passengers}
              onChange={handleChanges}
              min={1}
              max={10}
              name="passengers"
              type="number"
              id="travelers"
              placeholder="Number of passengers"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button onClick={handleSearch} className="w-full bg-[#d72f18] text-white px-4 py-2 rounded-md hover:bg-[#b52011] transition">
          Search Trains
        </button>
      </div>
    </div>
  );
};

export default Trains;
