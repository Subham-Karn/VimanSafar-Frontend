import { CalendarClock, PlaneLanding, PlaneTakeoff, Users, Briefcase } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Flights = () => {
  const navigate = useNavigate();
  const [flightDetails, setFlightDetails] = useState({
    from: '',
    to: '',
    departure: '',
    travelers: 1,
    cabin: 'Economy',
  });

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = ()=>{
     if(!flightDetails.from || !flightDetails.to || !flightDetails.departure || !flightDetails.travelers || !flightDetails.cabin){
        alert('Please fill in all required fields.');
     }else{
      navigate('/flights/search?=result', {state: flightDetails});
     }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg mt-6 space-y-6">
      {/* Flight Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* From Location */}
        <div className="flex items-center space-x-3">
          <PlaneTakeoff size={24} className="text-[#d72f18]" />
          <div className="w-full">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
            <input
              type="text"
              name="from"
              id="from"
              value={flightDetails.from}
              onChange={handleInputChange}
              placeholder="Enter departure city"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* To Location */}
        <div className="flex items-center space-x-3">
          <PlaneLanding size={24} className="text-[#d72f18]" />
          <div className="w-full">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="text"
              name="to"
              id="to"
              value={flightDetails.to}
              onChange={handleInputChange}
              placeholder="Enter destination city"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="flex items-center space-x-3">
          <CalendarClock size={24} className="text-[#d72f18]" />
          <div className="w-full">
            <label htmlFor="departure" className="block text-sm font-medium text-gray-700">Departure</label>
            <input
              type="date"
              name="departure"
              id="departure"
              value={flightDetails.departure}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="flex items-center space-x-3">
          <Users size={24} className="text-[#d72f18]" />
          <div className="w-full">
            <label htmlFor="travelers" className="block text-sm font-medium text-gray-700">Travelers</label>
            <input
              type="number"
              name="travelers"
              id="travelers"
              value={flightDetails.travelers}
              onChange={handleInputChange}
              min={1}
              placeholder="Number of travelers"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* Cabin Class */}
        <div className="flex items-center space-x-3">
          <Briefcase size={24} className="text-[#d72f18]" />
          <div className="w-full">
            <label htmlFor="cabin" className="block text-sm font-medium text-gray-700">Cabin Class</label>
            <select
              name="cabin"
              id="cabin"
              value={flightDetails.cabin}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            >
              <option value="Economy">Economy</option>
              <option value="Premium Economy">Premium Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSearch}
          className="w-full bg-[#d72f18] text-white px-4 py-2 rounded-md hover:bg-[#b52011] transition"
        >
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default Flights;
