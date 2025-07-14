import React, { useState, useEffect } from 'react';
import { MapPin, ArrowRight, Clock, CalendarDays, Plane, CheckCircle } from 'lucide-react';
import { useTravel } from '../hooks/useHook';
import BookNowModal from '../Mondals/Confirm-Mondals/BookNowMondal';

const FlightRoute = () => {
  const { setNavName } = useTravel();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [flights, setFlights] = useState([]);
  const { travels, loading, error } = useTravel();

  useEffect(() => {
    if (travels?.travels) {
      const filteredFlights = travels.travels.filter(item => item?.type === 'flight');
      setFlights(filteredFlights);
      setNavName('Flights');
    }
  }, [travels, setNavName]);



  // Loading state
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-6 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Flights</h2>
        <p className="text-red-600">{error.message || 'Failed to load flight data'}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty state
  if (flights.length === 0 && !loading) {
    return (
      <div className="max-w-5xl mx-auto mt-6 p-4 text-center">
        <div className="bg-gray-50 p-8 rounded-lg">
          <Plane className="mx-auto text-gray-400" size={48} />
          <h3 className="text-lg font-medium text-gray-700 mt-4">No Flights Available</h3>
          <p className="text-gray-500 mt-1">There are currently no flights scheduled for this route.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-[#d72f18] border-b pb-2 flex items-center">
        <Plane className="mr-2" size={24} />
        Available Flights
      </h2>

      {/* {bookingError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{bookingError}</p>
            </div>
          </div>
        </div>
      )} */}

      {flights.map((flight) => (
        <div
          key={flight.id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-100"
        >
          {/* Airline Info */}
          <div className="flex items-start space-x-4 w-full md:w-2/5 mb-4 md:mb-0">
            <div className="bg-[#d72f18]/10 p-2 rounded-full">
              <Plane className="text-[#d72f18]" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{flight.provider || 'Unknown Airline'}</h3>
              <p className="text-sm text-gray-500">{flight.provider_number || 'N/A'}</p>
              <div className="mt-1 text-xs text-gray-500">
                {flight.cabin_class || 'Economy'} • {flight.stops || 'Non-stop'}
              </div>
            </div>
          </div>

          {/* Route Details */}
          <div className="w-full md:w-2/5 mb-4 md:mb-0">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
              {/* From Location */}
              <div className="flex items-start space-x-2 w-full md:w-5/12">
                <MapPin size={18} className="text-[#d72f18] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">From</p>
                  <p className="text-sm font-medium">{flight.from_location || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    <Clock size={12} className="inline mr-1" />
                    {flight.departure_time || '--:--'}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex flex-col items-center w-full md:w-2/12">
                <div className="hidden md:block">
                  <ArrowRight className="text-gray-400" />
                </div>
                <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  {flight.duration || 'N/A'}
                </div>
              </div>

              {/* To Location */}
              <div className="flex items-start space-x-2 w-full md:w-5/12">
                <MapPin size={18} className="text-[#d72f18] mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">To</p>
                  <p className="text-sm font-medium">{flight.to_location || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    <Clock size={12} className="inline mr-1" />
                    {flight.arrival_time || '--:--'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price and Book Button */}
          <div className="flex flex-col items-end w-full md:w-1/5">
            <div className="text-[#d72f18] font-bold text-lg mb-2">
              {flight.price ? `₹${flight.price}` : 'Price N/A'}
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
              <CalendarDays size={12} className="text-[#d72f18]" />
              <span>{flight.departure || 'Date N/A'}</span>
            </div>
            <button
              onClick={() => {
                setSelectedFlight(flight);
                setIsBookingOpen(true);
              }}
              className="bg-[#d72f18] text-white px-4 py-2 rounded hover:bg-[#b52011] transition text-sm w-full md:w-auto"
            >
              Book Now
            </button>
          </div>
        </div>
      ))}

      {isBookingOpen && (
        <BookNowModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          selectedItem={selectedFlight}  // Changed from selectedItems to selectedItem
          type="flight"
        />
      )}
    </div>
  );
};

export default FlightRoute;