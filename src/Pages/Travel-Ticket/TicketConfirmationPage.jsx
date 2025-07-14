import React from 'react';
import { 
  CheckCircle, Plane, Train, Bus, Package,
  CalendarDays, Clock, MapPin, User,
  Mail, Phone, Users, CreditCard,
  Printer, Download, ShieldCheck, ArrowRight,
  Home, Info, ChevronLeft
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const TicketConfirmationPage = () => {
  const location = useLocation();
  const { ticket } = location.state || {};
  const navigate = useNavigate();
  
  if (!ticket) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md text-center">
        <div className="bg-red-100 p-4 rounded-full inline-block mb-4">
          <Info className="text-red-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket Not Found</h2>
        <p className="text-gray-600 mb-6">The requested ticket could not be loaded.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#d72f18] hover:bg-[#b52011] text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
        >
          <Home size={18} />
          Return Home
        </button>
      </div>
    );
  }

  const getTransportIcon = () => {
    switch (ticket.travel_type?.toLowerCase()) {
      case 'flight': return <Plane size={32} className="text-[#d72f18]" />;
      case 'train': return <Train size={32} className="text-[#d72f18]" />;
      case 'bus': return <Bus size={32} className="text-[#d72f18]" />;
      case 'package': return <Package size={32} className="text-[#d72f18]" />;
      default: return <div className="w-8 h-8 bg-[#d72f18] rounded-full"></div>;
    }
  };

  const handlePrint = () => window.print();

  const handleDownload = () => {
    console.log('Download ticket:', ticket.id);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 px-4 print:my-0 print:px-0">
      {/* Confirmation Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 print:shadow-none">
        <div className="bg-[#d72f18]/10 p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="bg-white p-3 rounded-full shadow-sm">
              <CheckCircle className="text-[#d72f18]" size={40} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Booking Confirmed!</h1>
              <p className="text-gray-600">Your {ticket.travel_type || 'travel'} is successfully booked</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#d72f18] hover:text-[#b52011] font-medium"
          >
            <ChevronLeft size={18} />
            Back to bookings
          </button>
        </div>

        {/* Ticket Summary */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-[#d72f18]/10 p-3 rounded-full">
                {getTransportIcon()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {ticket.provider || 'Travel Service'}
                </h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gray-500">
                    Booking #: {ticket.booking_id || 'N/A'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    ticket.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    ticket.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {ticket.status || 'CONFIRMED'}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-[#d72f18]">
                ₹{ticket.price?.toLocaleString() || '0'}
              </p>
            </div>
          </div>
        </div>

        {/* Journey Details */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Journey Details</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-bold text-lg">{ticket.from_location || 'N/A'}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                    <Clock size={12} />
                    {ticket.departure_time || '--:--'}
                  </p>
                </div>
                <div className="relative px-4">
                  <div className="w-16 h-px bg-gray-300 relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-white px-1">
                      <ArrowRight className="text-gray-400" size={16} />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                      {ticket.duration || 'N/A'}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-bold text-lg">{ticket.to_location || 'N/A'}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                    <Clock size={12} />
                    {ticket.arrival_time || '--:--'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <CalendarDays size={14} />
                    Departure Date
                  </p>
                  <p className="font-medium">{ticket.departure || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Class</p>
                  <p className="font-medium capitalize">{ticket.cabin || 'Standard'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Traveler Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Traveler Information</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="font-medium">{ticket.passenger_name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{ticket.passenger_email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{ticket.passenger_phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Travelers</p>
                  <p className="font-medium">
                    {ticket.travelers || 1} {ticket.travelers === 1 ? 'Person' : 'Persons'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="p-6 bg-blue-50 border-t border-blue-100">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Info className="text-blue-600" size={20} />
            Important Information
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li className="flex items-start gap-2"><span>•</span><span>Please arrive at least {ticket.travel_type === 'flight' ? '2 hours' : '30 minutes'} before departure</span></li>
            <li className="flex items-start gap-2"><span>•</span><span>Bring valid ID matching your booking details</span></li>
            <li className="flex items-start gap-2"><span>•</span><span>E-ticket is non-transferable</span></li>
            {ticket.travel_type === 'flight' && (
              <li className="flex items-start gap-2"><span>•</span><span>Check-in online when available to save time</span></li>
            )}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="text-[#d72f18]" size={18} />
            <span>Your booking is secured and protected</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium flex items-center gap-2"
            >
              <Download size={18} />
              Download Ticket
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#d72f18] text-white rounded-lg hover:bg-[#b52011] transition-colors font-medium flex items-center gap-2"
            >
              <Printer size={18} />
              Print Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Support Info */}
      <div className="bg-white rounded-xl shadow-md p-6 mt-6 print:hidden">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
        <p className="text-gray-600 mb-4">Contact our customer support team for any questions about your booking.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-800">Email Support</p>
            <p className="text-[#d72f18]">support@travelapp.com</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-medium text-gray-800">Phone Support</p>
            <p className="text-[#d72f18]">+1 (800) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmationPage;
