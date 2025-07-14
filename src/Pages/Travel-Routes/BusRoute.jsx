import React, { useState } from 'react';
import { BusFront, Clock, CalendarDays, MapPin } from 'lucide-react';

const dummyBuses = [
  {
    id: 1,
    name: 'RedLine Travels',
    type: 'AC Sleeper',
    from: 'Patna',
    to: 'Ranchi',
    departure: '10:00 PM',
    arrival: '05:00 AM',
    date: '2025-08-15',
    price: '₹899',
  },
  {
    id: 2,
    name: 'SuperFast Express',
    type: 'Non-AC Seater',
    from: 'Patna',
    to: 'Varanasi',
    departure: '06:00 PM',
    arrival: '12:00 AM',
    date: '2025-08-15',
    price: '₹499',
  },
  {
    id: 3,
    name: 'GreenLine Travels',
    type: 'AC Seater',
    from: 'Patna',
    to: 'Kolkata',
    departure: '08:00 PM',
    arrival: '06:00 AM',
    date: '2025-08-15',
    price: '₹1099',
  },
];

const BusSearchResults = () => {
  const [selectedBus, setSelectedBus] = useState(null);
  const  [isBookingOpen, setIsBookingOpen] = useState(false);

  // const handleBooking = (bus) => {
  //   console.log('Booked Bus:', bus);
  //   setIsBookingOpen(false);
  // };
  return (
    <div className="max-w-5xl mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-semibold text-[#d72f18] border-b pb-2">Available Buses</h2>
      {dummyBuses.map((bus) => (
        <div
          key={bus.id}
          className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
        >
          {/* Bus Info */}
          <div className="flex items-center space-x-4 w-full md:w-1/3">
            <BusFront className="text-[#d72f18]" size={28} />
            <div>
              <h3 className="font-semibold text-lg">{bus.name}</h3>
              <p className="text-sm text-gray-500">{bus.type}</p>
            </div>
          </div>

          {/* Route */}
          <div className="flex flex-col md:flex-row items-center justify-center md:w-1/3 text-gray-700 space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
            <div className="flex items-center space-x-1">
              <MapPin size={16} className="text-[#d72f18]" />
              <span>{bus.from}</span>
            </div>
            <span className="text-sm text-gray-400">→</span>
            <div className="flex items-center space-x-1">
              <MapPin size={16} className="text-[#d72f18]" />
              <span>{bus.to}</span>
            </div>
          </div>

          {/* Timing & Booking */}
          <div className="flex flex-col items-end md:w-1/3 text-right space-y-1">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <CalendarDays size={16} className="text-[#d72f18]" />
              <span>{bus.date}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Clock size={16} className="text-[#d72f18]" />
              <span>{bus.departure} - {bus.arrival}</span>
            </div>
            <div className="text-[#d72f18] font-bold text-lg">{bus.price}</div>
            <button onClick={() =>{
               setSelectedBus(bus);
               setIsBookingOpen(true);
            }} className="bg-[#d72f18] text-white px-4 py-1 rounded hover:bg-[#b52011] transition text-sm">
              Book Now
            </button>
          </div>
        </div>
      ))}
      {/* <BookingModal type='Bus' selectedItem={selectedBus} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} onConfirm={handleBooking}/> */}
    </div>
  );
};

export default BusSearchResults;
