import React, { useEffect, useState } from 'react';
import {
  CalendarDays, Clock, MapPin, User, Loader,
  AlertCircle, RefreshCw, Ticket, ChevronRight,
  Filter, Search, ArrowRight, ShieldCheck,
  Download, Eye, Package, Hotel, Plane, Bus, Train
} from 'lucide-react';
import { getAllPackageBookings } from '../../util/packageApi';
import { useNavigate } from 'react-router-dom';
import { useTravel } from '../../hooks/useHook';
import PackageDetailsModal from '../../Mondals/Packages/PackageDetailsMondal';
// import PackageDetailsModal from './PackageDetailsModal';

const BookedPackages = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setNavName } = useTravel();
  const localUser = JSON.parse(localStorage.getItem('user'));
   const Bookingresult = Array.isArray(bookings)
    ? bookings.filter(booking => booking.user_id === localUser?.Userdata?.user?.id)
    : [];
   

   const fetchBookings = async () => {
    try {
      setError(null);
      setRefreshing(true);
      const response = await getAllPackageBookings();
      setBookings(response.packages);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'Failed to load packages');
      setBookings([]);
    } finally {
        
      setLoading(false);
      setRefreshing(false);
    }
  }
  
  useEffect(()=>{
 

  fetchBookings();

  },[]);

  const handleRefresh = () => {
    setNavName(null);
    fetchBookings();
  };

  const handleViewDetails = (booking) => {
    setSelectedPackage(booking);
    setIsModalOpen(true);
  };

  const handleDownloadTicket = (bookingId) => {
    // Implement your PDF generation logic here
    console.log('Download ticket:', bookingId);
  };

  const filteredBookings = Bookingresult
    .filter(booking => {
      // Search filter
      const matchesSearch = 
        booking.package_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.user_name?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'confirmed' && booking.status === 'CONFIRMED') ||
        (filter === 'upcoming' && booking.status === 'UPCOMING') ||
        (filter === 'cancelled' && booking.status === 'CANCELLED');
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date));

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-red-100 p-6 rounded-full mb-4">
          <AlertCircle className="text-red-600" size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Packages</h3>
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
        <p className="mt-4 text-gray-600">Loading your packages...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Your Booked Packages</h1>
          <p className="text-gray-600">
            {filteredBookings.length} {filteredBookings.length === 1 ? 'package' : 'packages'} found
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
            placeholder="Search packages (title, destination, name...)"
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
            <option value="all">All Packages</option>
            <option value="confirmed">Confirmed</option>
            <option value="upcoming">Upcoming</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Packages Grid */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Packages Found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {searchTerm || filter !== 'all' 
              ? "No packages match your search criteria. Try adjusting your filters."
              : "You don't have any booked packages yet."}
          </p>
          <button
            onClick={() => navigate('/packages')}
            className="bg-[#d72f18] hover:bg-[#b52011] text-white px-6 py-2 rounded-lg transition-colors"
          >
            Browse Packages
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBookings.map((booking, index) => (
            <div
              key={booking?.id || index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden"
            >
              {/* Package Status Ribbon */}
              <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-semibold rounded-bl-lg ${
                booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                booking.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {booking.status || 'CONFIRMED'}
              </div>

              {/* Package Header */}
              <div className="p-5 pb-3">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                      <Package className="text-[#d72f18]" size={20} />
                      {booking.package_title || 'Package'}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Booking #{booking.id?.slice(0, 8) || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Reference</p>
                    <p className="font-mono text-sm">PKG-{String(index + 1).padStart(3, '0')}</p>
                  </div>
                </div>

                {/* Destination Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="text-lg font-bold text-gray-800">{booking.destination || 'N/A'}</p>
                  </div>
                </div>

                {/* Package Details */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="text-[#d72f18]" size={16} />
                    <span>
                      {booking.departure_date ? 
                        new Date(booking.departure_date).toLocaleDateString() : 
                        'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="text-[#d72f18]" size={16} />
                    <span>{booking.duration || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="text-[#d72f18]" size={16} />
                    <span>{booking.guests || 1} {booking.guests === 1 ? 'guest' : 'guests'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hotel className="text-[#d72f18]" size={16} />
                    <span>{booking.accommodation || 'Standard'}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 mx-5"></div>

              {/* Traveler and Price Info */}
              <div className="p-5 pt-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <User className="text-[#d72f18]" size={16} />
                      <span className="font-medium">{booking.user_name || 'N/A'}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>{booking.email || 'No email'}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Price</p>
                    <p className="text-lg font-bold text-[#d72f18]">
                      ₹{booking.price?.toLocaleString() || '0'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between">
                <button 
                  onClick={() => handleViewDetails(booking)}
                  className="text-[#d72f18] hover:text-[#b52011] font-medium flex items-center gap-1"
                >
                  <Eye size={18} /> View Details
                </button>
                <button 
                  onClick={() => handleDownloadTicket(booking.id)}
                  className="bg-[#d72f18] hover:bg-[#b52011] text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                >
                  <Download size={18} /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Security Assurance */}
      <div className="mt-12 bg-[#d72f18]/5 border border-[#d72f18]/20 rounded-xl p-5 flex items-start gap-4">
        <ShieldCheck className="text-[#d72f18] mt-1" size={24} />
        <div>
          <h4 className="font-semibold text-gray-800 mb-1">Secure Package Management</h4>
          <p className="text-sm text-gray-600">
            Your package bookings are securely stored and protected. All transactions are encrypted for your safety.
          </p>
        </div>
      </div>

      {/* Package Details Modal */}
      <PackageDetailsModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        package={selectedPackage} 
      />
    </div>
  );
};

export default BookedPackages;