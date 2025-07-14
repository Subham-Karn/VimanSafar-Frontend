import React from 'react';
import { MapPinOff } from 'lucide-react';

const NoServiceAvailable = ({ destination = 'your location', type = 'service' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 text-gray-600">
      <MapPinOff size={48} className="text-red-500" />
      <h2 className="text-2xl font-semibold text-gray-800">
        No {type} available at <span className="text-[#d72f18] capitalize">{destination}</span>
      </h2>
      <p className="text-sm text-gray-500 max-w-md">
        We're sorry! We currently do not operate {type}s at the selected location. Please try a different destination.
      </p>
      <button onClick={() => window.location.href = '/'} className='bg-[#d72f18] text-white px-4 py-2 rounded-md'>
        Back to Home
      </button>
    </div>
  );
};

export default NoServiceAvailable;
