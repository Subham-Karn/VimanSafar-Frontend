import React from 'react';
import { X, Plane, CalendarDays, User, Train, Package, Bus } from 'lucide-react';

const TicketDetailsModal = ({isOpen , onClose , ticket}) => {
  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 ">
      <div className="bg-white w-full max-w-xl rounded-xl shadow-xl p-6 relative border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-500 hover:text-red-600" />
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-1 flex items-center gap-2">
             {ticket.travel_type === 'flight' && <Plane size={24} className="text-red-600" />}
             {ticket.travel_type === 'train' && <Train size={24} className="text-red-600" />} 
             {ticket.travel_type === 'bus' && <Bus size={24} className="text-red-600" />}
             {ticket.type === 'Package' && <Package size={24} className="text-red-600" />}
              Ticket Details
            </h2>
            <p className="text-sm text-gray-500">Booking reference: <span className='font-semibold text-black'>#{ticket.booking_id || 'N/A'}</span></p>
          </div>
          <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
            {ticket.status || 'Confirmed'}
          </span>
        </div>

        {/* Flight Info Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500">From</p>
              <p className="font-semibold text-gray-900">{ticket.from_location || 'N/A'}</p>
            </div>
            <div className="w-16 h-px bg-gray-300 relative">
              <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                {ticket.duration}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500">To</p>
              <p className="font-semibold text-gray-900">{ticket.to_location || 'N/A'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <CalendarDays size={14} />
                Departure
              </p>
              <p className="font-medium">{ticket.departure}</p>
              <p className="text-sm text-gray-700">{ticket.departure_time}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <CalendarDays size={14} />
                Arrival
              </p>
              <p className="font-medium">{ticket.arrival || ticket.departure}</p>
              <p className="text-sm text-gray-700">{ticket.arrival_time}</p>
            </div>
          </div>
        </div>

        {/* Price and Travel Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Total Price</p>
            <p className="text-xl font-bold text-red-600">₹{ticket.price}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Travelers</p>
            <p className="font-medium">{ticket.travelers} {ticket.travelers > 1 ? 'Persons' : 'Person'}</p>
            <p className="text-xs text-gray-500">{ticket.cabin}</p>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="border-t pt-4">
          <h3 className="font-semibold flex items-center gap-2 mb-3 text-gray-800">
            <User size={18} className="text-red-600" />
            Passenger Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-medium">{ticket.passenger_name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{ticket.passenger_email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone Number</p>
              <p className="font-medium">{ticket.passenger_phone}</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="pt-6 flex justify-end gap-3 border-t mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm"
          >
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsModal;