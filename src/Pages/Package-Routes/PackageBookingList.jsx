import React from 'react';
import { usePackage, useTravel } from '../../hooks/useHook';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers, FaRupeeSign, FaDownload, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BookedPackages = () => {
  const { bookedPackegs, loading } = usePackage();
  const bookings = bookedPackegs || [];
  const navigate = useNavigate();
  const {setNavName} = useTravel();
  setNavName(null);

  const handleDownloadTicket = (bookingId) => {
    // This will use the browser's print dialog to save as PDF
    const ticketElement = document.getElementById(`ticket-${bookingId}`);
    if (ticketElement) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Ticket ${bookingId}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
              .ticket { border: 1px solid #ddd; border-radius: 8px; padding: 20px; max-width: 600px; margin: 0 auto; }
              .header { background-color: #d72f18; color: white; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
              .section { margin-bottom: 15px; }
              .section-title { font-weight: bold; color: #d72f18; margin-bottom: 5px; }
              .row { display: flex; margin-bottom: 8px; }
              .label { width: 120px; color: #666; }
              .value { flex: 1; }
              .highlights { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px; }
              .highlight { background-color: #f0f0f0; padding: 3px 8px; border-radius: 12px; font-size: 12px; }
              .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #888; }
            </style>
          </head>
          <body>
            ${ticketElement.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  const handleViewDetails = (booking) => {
    navigate('/ticket-details', { state: { booking } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d72f18]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#d72f18] mb-8 text-center">Your Booked Packages</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-600 text-lg">No bookings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
              {/* Hidden ticket for PDF generation */}
              <div id={`ticket-${booking.id}`} className="hidden">
                <div className="ticket">
                  <div className="header">
                    <h2>{booking.package_title}</h2>
                    <p>Booking ID: {booking.id}</p>
                  </div>
                  
                  <div className="section">
                    <div className="section-title">Traveler Details</div>
                    <div className="row">
                      <div className="label">Name:</div>
                      <div className="value">{booking.user_name}</div>
                    </div>
                    <div className="row">
                      <div className="label">Email:</div>
                      <div className="value">{booking.email}</div>
                    </div>
                    <div className="row">
                      <div className="label">Phone:</div>
                      <div className="value">{booking.phone}</div>
                    </div>
                  </div>

                  <div className="section">
                    <div className="section-title">Trip Details</div>
                    <div className="row">
                      <div className="label">Duration:</div>
                      <div className="value">{booking.duration}</div>
                    </div>
                    <div className="row">
                      <div className="label">Departure:</div>
                      <div className="value">
                        {booking.departure_date ? new Date(booking.departure_date).toLocaleDateString() : 'Not specified'}
                      </div>
                    </div>
                    <div className="row">
                      <div className="label">Guests:</div>
                      <div className="value">{booking.guests}</div>
                    </div>
                    <div className="row">
                      <div className="label">Total Price:</div>
                      <div className="value">₹{booking.price.toLocaleString()}</div>
                    </div>
                  </div>

                  {booking.highlights?.length > 0 && (
                    <div className="section">
                      <div className="section-title">Package Highlights</div>
                      <div className="highlights">
                        {booking.highlights.map((highlight, i) => (
                          <span key={i} className="highlight">{highlight}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {booking.special_requests && booking.special_requests.toLowerCase() !== 'na' && (
                    <div className="section">
                      <div className="section-title">Special Requests</div>
                      <p>{booking.special_requests}</p>
                    </div>
                  )}

                  <div className="footer">
                    <p>Thank you for booking with us!</p>
                    <p>For any queries, contact support@travelapp.com</p>
                  </div>
                </div>
              </div>

              {/* Visible Card */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-[#d72f18]">{booking.package_title}</h2>
                  <span className="bg-[#d72f18] text-white px-2 py-1 rounded text-xs font-bold">
                    #{booking.id.slice(0, 8)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <FaUser className="text-[#d72f18] mr-3" />
                    <span>{booking.user_name}</span>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-[#d72f18] mr-3" />
                    <span>{booking.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-[#d72f18] mr-3" />
                    <span>{booking.phone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-[#d72f18] mr-2" />
                    <span className="text-sm">
                      {booking.departure_date ? 
                        new Date(booking.departure_date).toLocaleDateString() : 
                        'Not specified'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaUsers className="text-[#d72f18] mr-2" />
                    <span className="text-sm">{booking.guests} {booking.guests > 1 ? 'Guests' : 'Guest'}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRupeeSign className="text-[#d72f18] mr-2" />
                    <span className="text-sm">₹{booking.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-[#d72f18] mr-2" />
                    <span className="text-sm">{booking.duration}</span>
                  </div>
                </div>

                {booking.highlights?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Highlights</h3>
                    <div className="flex flex-wrap gap-2">
                      {booking.highlights.slice(0, 3).map((highlight, i) => (
                        <span key={i} className="bg-[#d72f18]/10 text-[#d72f18] text-xs px-2 py-1 rounded">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {booking.special_requests && booking.special_requests.toLowerCase() !== 'na' && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">Special Requests</h3>
                    <p className="text-sm text-gray-600">{booking.special_requests}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 flex justify-between">
                <button 
                  onClick={() => handleViewDetails(booking)}
                  className="text-[#d72f18] hover:text-[#b82612] font-medium flex items-center gap-1"
                >
                  <FaEye /> View Details
                </button>
                <button 
                  onClick={() => handleDownloadTicket(booking.id)}
                  className="bg-[#d72f18] hover:bg-[#b82612] text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                >
                  <FaDownload /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookedPackages;