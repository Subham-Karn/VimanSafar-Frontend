import React, { useState } from 'react';
import { TrainFront, Clock, CalendarDays, MapPin } from 'lucide-react';
import { useTravel } from '../../hooks/useHook';
import { useLocation } from 'react-router-dom';
import NoServiceAvailable from '../../util/NoServiceAvilable';

const TrainSearchResults = () => {
    const [selectedTrain, setSelectedTrain] = useState(null);
    const  [isBookingOpen, setIsBookingOpen] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    query.get('search');
    const stateData = location.state;
    const {travels , setNavName} = useTravel();
    const localTravel = travels?.travels || [];
    const Trains = localTravel.filter((train) => train?.type === 'train');
    const fromBasedTrains = Trains.filter((train) => train?.from_location === stateData?.from && train?.to_location === stateData?.to);
    setNavName('Trains');
    // const handleBooking = (train) => {
    //   console.log('Booked Train:', train);
    //   setIsBookingOpen(false);
    // };
    if(!fromBasedTrains.length){
      return <NoServiceAvailable destination={stateData?.from} type="train"/>
    }
  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-[#d72f18] border-b pb-2">Available Trains</h2>

      {fromBasedTrains.map((train) => (
        <div
          key={train.id}
          className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
        >
          {/* Train Info */}
          <div className="flex items-center space-x-4 w-full md:w-1/3">
            <TrainFront className="text-[#d72f18]" size={28} />
            <div>
              <h3 className="font-semibold text-lg">{train.name || 'Unnamed Train'}</h3>
              <p className="text-sm text-gray-500">
                {train.number || 'N/A'} | {train.class || 'General'}
              </p>
            </div>
          </div>

=
            {/* Route Details */}
            <div className="flex flex-col md:flex-row items-center justify-center md:w-1/3 text-gray-700 space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
              {/* From Location */}
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-[#d72f18]" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">From</p>
                  <p className="text-sm font-medium">{train?.from_location || 'Unknown'}</p>
                </div>
              </div>

              {/* Arrow */}
              <span className="text-gray-400 text-xl">→</span>

              {/* To Location */}
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-[#d72f18]" />
                <div className="text-left">
                  <p className="text-xs text-gray-500">To</p>
                  <p className="text-sm font-medium">{train?.to_location || 'Unknown'}</p>
                </div>
              </div>
            </div>


            {/* Timing and Price */}
            <div className="flex flex-col items-end md:w-1/3 space-y-1 text-right">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <CalendarDays size={16} className="text-[#d72f18]" />
                <span>{train?.departure || '2023-09-01'}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock size={16} className="text-[#d72f18]" />
                <span>
                  {train?.departures || '22:00'} - {train?.arrival || '23:00'}
                </span>
              </div>
              <div className="text-[#d72f18] font-bold text-lg">
                {train?.price || '₹0'}
              </div>
              <button
                onClick={() => {
                  setSelectedTrain(train);
                  setIsBookingOpen(true);
                }}
                className="bg-[#d72f18] text-white px-4 py-1 rounded hover:bg-[#b52011] transition text-sm"
              >
                Book Now
              </button>
            </div>
        </div>
      ))}

      {/* Booking Modal */}
      {/* <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedItem={selectedTrain}
        onBook={handleBooking}
        type="Train"
      /> */}
    </div>
  );
};

export default TrainSearchResults;
