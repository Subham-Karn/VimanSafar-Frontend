import React from 'react';
import { MapPinned, CalendarClock, Users, Hotel, BusFront, Plane, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
    const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg  border-b border-b-[#d72f18] mt-6 space-y-6">
  {/* Package Booking Details */}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination */}
        <div className="flex items-center space-x-3">
          <MapPinned className="text-[#d72f18]" />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Destination</label>
            <input
              type="text"
              placeholder="Enter destination"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="flex items-center space-x-3">
          <CalendarClock className="text-[#d72f18]" />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* Travelers */}
        <div className="flex items-center space-x-3">
          <Users className="text-[#d72f18]" />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Travelers</label>
            <input
              type="number"
              placeholder="No. of people"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>

        {/* Transport Type */}
        <div className="flex items-center space-x-3">
          <BusFront className="text-[#d72f18]" />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Transport Mode</label>
            <select className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]">
              <option value="">Select</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
              <option value="flight">Flight</option>
            </select>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-center space-x-3">
          <IndianRupee className="text-[#d72f18]" />
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">Budget</label>
            <input
              type="number"
              placeholder="Estimated budget"
              className="mt-1 w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-[#d72f18]"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="pt-4">
        <button onClick={navigate('/packages/results')} className="w-full bg-[#d72f18] text-white px-4 py-2 rounded-md hover:bg-[#b52011] transition">
          Search Packages
        </button>
      </div>
    </div>
  );
};

export default Packages;
