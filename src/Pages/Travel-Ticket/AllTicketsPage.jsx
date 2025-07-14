import React, { useEffect, useState } from 'react';
import {
  Plane, CalendarDays, Clock, MapPin, User,
  Loader, AlertCircle, RefreshCw, Ticket, ChevronRight,
  Filter, Search, ArrowRight, ShieldCheck,
  Train,
  Bus
} from 'lucide-react';
import { getAllTickets } from '../../util/Transport';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../../hooks/useHook';
import TicketDetailsModal from './TicketDetailsMondals';

const AllTicketsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const {setNavName} = useTravel();
  const localUser = JSON.parse(localStorage.getItem('user'))
  const Bookingresult = Array.isArray(bookings)
    ? bookings.filter(booking => booking.user_id === localUser?.Userdata?.user?.id)
    : [];
  const fetchBookings = async () => {
    try {
      setError(null);
      setRefreshing(true);
      const respose = await getAllTickets();
      const res = respose.travels;
      if (!Array.isArray(res)) {
        throw new Error('Invalid data format received');
      }

      setBookings(res);
      
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'Failed to load tickets');
      setBookings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchBookings();

  }, []);

  const handleRefresh = () => {
    fetchBookings();
    setNavName(null);
  };

  const handleViewDetails = (booking) => {
     setSelectedTicket(booking);
     setIsModalOpen(true);
  };

  const filteredBookings = Bookingresult
    .filter(booking => {
      // Search filter
      const matchesSearch = 
        booking.provider?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.to?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'confirmed' && booking.status === 'CONFIRMED') ||
        (filter === 'upcoming' && booking.status === 'UPCOMING') ||
        (filter === 'cancelled' && booking.status === 'CANCELLED');
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(a.departure) - new Date(b.departure));

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-100 p-6 rounded-full mb-4">
          <AlertCircle className="text-red-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Tickets</h3>
        <p className="text-gray-600 mb-6 text-center max-w-md">{error}</p>
        <button
          onClick={handleRefresh}
          className="bg-[#d72f18] hover:bg-[#b52011] text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
          disabled={refreshing}
        >
          {refreshing ? <Loader className="animate-spin" size={18} /> : <RefreshCw size={18} />}
          Try Again
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-[#d72f18]" size={32} />
        <p className="mt-4 text-gray-600">Loading your tickets...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Flight Tickets</h1>
          <p className="text-gray-600">
            {filteredBookings.length} {filteredBookings.length === 1 ? 'ticket' : 'tickets'} found
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-[#d72f18] hover:text-[#b52011] transition-colors"
            disabled={refreshing}
          >
            {refreshing ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              <RefreshCw size={18} />
            )}
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search tickets (airline, destination, name...)"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d72f18] focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Filter className="text-gray-500" size={18} />
          <select 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d72f18] focus:border-transparent"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Tickets</option>
            <option value="confirmed">Confirmed</option>
            <option value="upcoming">Upcoming</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Tickets Grid */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Ticket className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Tickets Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filter !== 'all' 
              ? "No tickets match your search criteria. Try adjusting your filters."
              : "You don't have any booked tickets yet."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#d72f18] hover:bg-[#b52011] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Book a Flight
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((booking, index) => (
            <div
              key={booking?.id || index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden cursor-pointer group"
              onClick={() =>{  
                handleViewDetails(booking)
              }}
            >
              {/* Ticket Status Ribbon */}
              <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-semibold rounded-bl-lg ${
                booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                booking.status === 'UNCONFIRMED' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {booking.status || 'CONFIRMED'}
              </div>

              {/* Ticket Header */}
              <div className="p-5 pb-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                     {booking.travel_type === 'flight' && <Plane className="text-[#d72f18]" size={20} />}
                     {booking.travel_type === 'train' && <Train className="text-[#d72f18]" size={20} />}
                     {booking.travel_type === 'bus' && <Bus className="text-[#d72f18]" size={20} />}

                      {booking?.provider || 'Unknown Airline'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Flight #{booking?.booking_id || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Booking Ref</p>
                    <p className="font-mono text-sm">TICK-{String(index + 1).padStart(3, '0')}</p>
                  </div>
                </div>

                {/* Route Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">{booking?.from_location|| 'N/A'}</p>
                    <p className="text-xs text-gray-500">Departure</p>
                  </div>
                  <div className="px-2">
                    <ArrowRight className="text-gray-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">{booking?.to_location || 'N/A'}</p>
                    <p className="text-xs text-gray-500">Arrival</p>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="text-[#d72f18]" size={16} />
                    <span>{new Date(booking?.created_at).toLocaleDateString() || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-[#d72f18]" size={16} />
                    <span>{booking?.departure_time|| 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mx-5"></div>

              {/* Passenger and Price Info */}
              <div className="p-5 pt-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="text-[#d72f18]" size={16} />
                      <span className="font-medium">{booking?.passenger_name || 'N/A'}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>{booking?.travelers || 1} {booking?.travelers === 1 ? 'traveler' : 'travelers'}</span>
                      <span className="capitalize">{booking?.cabin || 'Economy'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Price</p>
                    <p className="text-lg font-bold text-[#d72f18]">
                      ₹{booking?.price?.toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
                </div>
              </div>
          ))}
        </div>
      )}

      {/* Security Assurance */}
      <div className="mt-12 bg-[#d72f18]/5 border border-[#d72f18]/20 rounded-xl p-5 flex items-start gap-4">
        <ShieldCheck className="text-[#d72f18] mt-1" size={24} />
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">Secure Ticket Management</h4>
          <p className="text-sm text-gray-600">
            Your tickets are securely stored and protected. All transactions are encrypted for your safety.
          </p>
        </div>
      </div>
      <TicketDetailsModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} ticket={selectedTicket} />
    </div>
  );
};

export default AllTicketsPage;