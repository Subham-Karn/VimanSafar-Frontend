import React, { useEffect, useState } from 'react';
import { BookingDeatils } from '../util/consts';
import Flights from '../Transport-Components/Flights';
import Trains from '../Transport-Components/Trains';
import Bus from '../Transport-Components/Bus';
import Packages from '../Transport-Components/Package'; // assuming correct import
import { useTravel } from '../hooks/useHook';

const BookingCard = () => {
  const [type, setType] = useState('Flight');
  const {setNavName} = useTravel();
  useEffect(() => {
    if(type === 'Flight') setNavName('Flights');
    if(type === 'Train') setNavName('Trains');
    if(type === 'Bus') setNavName('Bus');
  })
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 max-w-5xl mx-auto mt-4">
      {/* Header Tabs */}
      <div className="flex justify-around border-b border-b-gray-200 pb-4">
        {BookingDeatils.map((item, index) => (
          <button
            key={index}
            onClick={() => setType(item.name)}
            className={`flex flex-col items-center text-sm font-medium transition duration-200 hover:text-[#d72f18] ${
              type === item.name ? 'text-[#d72f18]' : 'text-gray-600'
            }`}
          >
            <span className="mb-1">{item.icon}</span>
            <span>{item.name}</span>
            {type === item.name && (
              <div className="mt-1 w-3 h-1 rounded-full bg-[#d72f18]"></div>
            )}
          </button>
        ))}
      </div>

      {/* Content Component */}
      <div className="pt-6">
        {type === 'Flight' && <Flights />}
        {type === 'Train' && <Trains />}
        {type === 'Bus' && <Bus />}
      </div>
    </div>
  );
};

export default BookingCard;
