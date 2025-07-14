import React from 'react';
import { 
  X, Package, CalendarDays, Clock, MapPin, 
  User, Mail, Phone, Users, Hotel, 
  Plane, Train, Bus, ShieldCheck, Download 
} from 'lucide-react';

const PackageDetailsModal = ({ isOpen, onClose, package: pkg }) => {
  if (!isOpen || !pkg) return null;

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'flight': return <Plane size={20} className="text-[#d72f18]" />;
      case 'train': return <Train size={20} className="text-[#d72f18]" />;
      case 'bus': return <Bus size={20} className="text-[#d72f18]" />;
      default: return null;
    }
  };

  const handleDownload = () => {
    // Implement download functionality
    console.log('Download package details:', pkg.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 relative border border-gray-200">
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
            <h2 className="text-2xl font-bold text-[#d72f18] mb-1 flex items-center gap-2">
              <Package size={24} className="text-[#d72f18]" />
              Package Booking Details
            </h2>
            <p className="text-sm text-gray-500">
              Booking reference: <span className="font-semibold text-black">#{pkg.id?.slice(0, 8) || 'N/A'}</span>
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            pkg.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
            pkg.status === 'UPCOMING' ? 'bg-blue-100 text-blue-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {pkg.status || 'CONFIRMED'}
          </span>
        </div>

        {/* Package Info Card */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-lg">{pkg.package_title}</h3>
              <p className="text-sm text-gray-500">{pkg.destination}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="text-xl font-bold text-[#d72f18]">₹{pkg.price?.toLocaleString() || '0'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <CalendarDays size={14} />
                Departure Date
              </p>
              <p className="font-medium">
                {pkg.departure_date ? new Date(pkg.departure_date).toLocaleDateString() : 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Clock size={14} />
                Duration
              </p>
              <p className="font-medium">{pkg.duration || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Users size={14} />
                Travelers
              </p>
              <p className="font-medium">{pkg.guests || 1} {pkg.guests === 1 ? 'person' : 'people'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Hotel size={14} />
                Accommodation
              </p>
              <p className="font-medium">{pkg.accommodation || 'Standard'}</p>
            </div>
          </div>
        </div>

        {/* Transportation Details */}
        {pkg.transport_type && (
          <div className="mb-6">
            <h3 className="font-semibold flex items-center gap-2 mb-3 text-gray-800">
              {getTransportIcon(pkg.transport_type)}
              Transportation
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="font-medium capitalize">{pkg.transport_type}</p>
              </div>
              {pkg.transport_details && (
                <div>
                  <p className="text-xs text-gray-500">Details</p>
                  <p className="font-medium">{pkg.transport_details}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Traveler Info */}
        <div className="mb-6">
          <h3 className="font-semibold flex items-center gap-2 mb-3 text-gray-800">
            <User size={18} className="text-[#d72f18]" />
            Traveler Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-medium">{pkg.user_name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{pkg.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone Number</p>
              <p className="font-medium">{pkg.phone}</p>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {pkg.special_requests && pkg.special_requests.toLowerCase() !== 'na' && (
          <div className="mb-6">
            <h3 className="font-semibold flex items-center gap-2 mb-3 text-gray-800">
              <span className="text-[#d72f18]">•</span>
              Special Requests
            </h3>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <p className="text-sm">{pkg.special_requests}</p>
            </div>
          </div>
        )}

        {/* Package Highlights */}
        {pkg.highlights?.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold flex items-center gap-2 mb-3 text-gray-800">
              <span className="text-[#d72f18]">•</span>
              Package Highlights
            </h3>
            <div className="flex flex-wrap gap-2">
              {pkg.highlights.map((highlight, i) => (
                <span 
                  key={i} 
                  className="bg-[#d72f18]/10 text-[#d72f18] text-sm px-3 py-1 rounded-full"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Buttons */}
        <div className="pt-6 flex justify-between border-t mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck size={16} className="text-[#d72f18]" />
            <span>Booking secured and protected</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
            >
              <Download size={18} />
              Download
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#d72f18] text-white rounded-lg hover:bg-[#b52011] transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsModal;