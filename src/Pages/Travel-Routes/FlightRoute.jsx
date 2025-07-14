import React, { useState } from 'react';
import { Plane, Clock, CalendarDays, MapPin } from 'lucide-react';
import { useTravel } from '../../hooks/useHook';
import { useLocation } from 'react-router-dom';
import NoServiceAvailable from '../../util/NoServiceAvilable';

const FlightSearchResults = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();
  const stateData = location.state;

  const { travels } = useTravel();
  const allTravels = travels?.travels || [];

  // Filter flights
  const flights = allTravels.filter((item) => item.type === 'flight');
  const fromBasedFlights = flights.filter(
    (flight) =>
      flight.from_location === stateData?.from &&
      flight.to_location === stateData?.to
  );

  if (!fromBasedFlights.length) {
    return <NoServiceAvailable destination={stateData?.from} type="flight" />;
  }

  // const handleBooking = (flight) => {
  //   console.log('Booked flight:', flight);
  //   setIsBookingOpen(false);
  // };

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-[#d72f18] border-b pb-2">Available Flights</h2>

      {fromBasedFlights.map((flight) => (
        <div
          key={flight.id}
          className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
        >
          {/* Airline Info */}
          <div className="flex items-center space-x-4 w-full md:w-1/3">
            <Plane className="text-[#d72f18]" size={28} />
            <div>
              <h3 className="font-semibold text-lg">{flight.provider}</h3>
              <p className="text-sm text-gray-500">{flight.flightNumber || 'N/A'}</p>
            </div>
          </div>

          {/* Route Details */}
          <div className="flex flex-col md:flex-row items-center justify-center md:w-1/3 text-gray-700 space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-[#d72f18]" />
              <div className="text-left">
                <p className="text-xs text-gray-500">From</p>
                <p className="text-sm font-medium">{flight.from_location}</p>
              </div>
            </div>

            <span className="text-gray-400 text-xl">→</span>

            <div className="flex items-center space-x-2">
              <MapPin size={18} className="text-[#d72f18]" />
              <div className="text-left">
                <p className="text-xs text-gray-500">To</p>
                <p className="text-sm font-medium">{flight.to_location}</p>
              </div>
            </div>
          </div>

          {/* Timing and Price */}
          <div className="flex flex-col items-end md:w-1/3 space-y-1 text-right">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <CalendarDays size={16} className="text-[#d72f18]" />
              <span>{flight.departure}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock size={16} className="text-[#d72f18]" />
              <span>
                {flight.departure_time || 'N/A'} - {flight.arrival_time || 'N/A'}
              </span>
            </div>
            {flight.duration && (
              <div className="text-xs text-gray-400">{flight.duration}</div>
            )}
            <div className="text-[#d72f18] font-bold text-lg">
              ₹{flight.price}
            </div>
            <button
              onClick={() => {
                setSelectedFlight(flight);
                setIsBookingOpen(true);
              }}
              className="bg-[#d72f18] text-white px-4 py-1 rounded hover:bg-[#b52011] transition text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightSearchResults;
