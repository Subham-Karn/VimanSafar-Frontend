import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaClock,
  FaUserFriends,
  FaReceipt,
  FaDownload
} from 'react-icons/fa';

const PackageTicket = () => {
  const { state } = useLocation();
  const userData = state?.formData || {};
  const booking = state?.booking || {};
  console.log(userData.date);
  
  const bookingDate = useMemo(() => new Date().toISOString(), []);
  const bookingId = useMemo(
    () => `BK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    []
  );

  const totalPrice =
    (booking?.price || 0) * (parseInt(userData.guests || 1, 10));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#d72f18] mb-2">Booking Confirmation</h1>
          <p className="text-gray-600">Your booking has been confirmed successfully!</p>
          <div className="mt-4 bg-green-100 text-green-800 py-2 px-4 rounded-lg inline-block">
            Booking ID: {bookingId}
          </div>
        </div>

        {/* Ticket Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Ticket Header */}
          <div className="bg-[#d72f18] text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{booking?.title || 'N/A'}</h2>
                <p className="text-white/90 mt-1">{booking?.description || 'No description available'}</p>
              </div>
              <div className="bg-white text-[#d72f18] px-4 py-2 rounded-lg font-bold">
                ₹{totalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-6 grid md:grid-cols-2 gap-8">
            {/* Left Column - Booking Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Booking Details</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <FaCalendarAlt className="text-[#d72f18] mt-1 mr-3" />
                  <div>
                    <p className="text-gray-500">Travel Date</p>
                    <p className="font-medium">
                      {userData.date || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-[#d72f18] mt-1 mr-3" />
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">{booking.duration || 'N/A'}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaUserFriends className="text-[#d72f18] mt-1 mr-3" />
                  <div>
                    <p className="text-gray-500">Travelers</p>
                    <p className="font-medium">
                      {userData.guests || 1}{' '}
                      {userData.guests > 1 ? 'persons' : 'person'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaReceipt className="text-[#d72f18] mt-1 mr-3" />
                  <div>
                    <p className="text-gray-500">Booking Date</p>
                    <p className="font-medium">
                      {new Date(bookingDate).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Customer Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Customer Information
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{userData.name || 'N/A'}</p>
                </div>

                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{userData.email || 'N/A'}</p>
                </div>

                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{userData.phone || 'N/A'}</p>
                </div>

                {userData.specialRequests && (
                  <div>
                    <p className="text-gray-500">Special Requests</p>
                    <p className="font-medium">{userData.specialRequests}</p>
                  </div>
                )}
              </div>

              {/* Inclusions */}
              {booking.package && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Package Inclusions
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {booking.package.food_included && (
                      <span className="bg-[#d72f18]/10 text-[#d72f18] px-3 py-1 rounded-full text-sm">
                        Meals Included
                      </span>
                    )}
                    {booking.package.guide_included && (
                      <span className="bg-[#d72f18]/10 text-[#d72f18] px-3 py-1 rounded-full text-sm">
                        Guide Included
                      </span>
                    )}
                    {booking.package.stay_details && (
                      <span className="bg-[#d72f18]/10 text-[#d72f18] px-3 py-1 rounded-full text-sm">
                        {booking.package.stay_details}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Highlights */}
          {Array.isArray(booking.highlights) && booking.highlights.length > 0 && (
            <div className="px-6 pb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Package Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {booking.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#d72f18] mr-2">•</span>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              Need help? Contact our support team at support@travelapp.com
            </p>
            <button className="bg-[#d72f18] hover:bg-[#b82612] text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2">
              <FaDownload />
              Download Ticket
            </button>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            to="/packages"
            className="inline-block text-[#d72f18] hover:text-[#b82612] font-medium"
          >
            ← Back to All Packages
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageTicket;