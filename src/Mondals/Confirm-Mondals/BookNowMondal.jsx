import {
  BusFront, Plane, TrainFront, X, CalendarDays, Clock,
  User, Mail, Phone, CheckCircle, Info, ArrowRight
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  TravelBooking } from '../../util/Transport';

const BookNowModal = ({ onClose, isOpen, selectedItem, type}) => {
  const localUser = JSON.parse(localStorage.getItem('user'));
  const [passengerDetails, setPassengerDetails] = useState({
    passenger_name: localUser?.profile?.full_name || '',
    passenger_email:localUser?.Userdata?.user?.email || '',
    passenger_phone: localUser?.profile?.phone || '',
    travelers: 1,
    cabin: 'Economy'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  if (!isOpen || !selectedItem) return null;

  const getTravelIcon = () => {
    const iconClass = "text-[#d72f18]";
    switch (type) {
      case 'flight': return <Plane size={24} className={iconClass} />;
      case 'train': return <TrainFront size={24} className={iconClass} />;
      case 'bus': return <BusFront size={24} className={iconClass} />;
      default: return <div className={`w-6 h-6 bg-[#d72f18] rounded-full`}></div>;
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails(prev => ({ ...prev, [name]: value }));
  };

  // const validateForm = () => {
  //   if (!passengerDetails.passenger_name.trim()) return setError('Please enter your full name');
  //   if (!/^\S+@\S+\.\S+$/.test(passengerDetails.passenger_email)) return setError('Please enter a valid email address');
  //   if (!/^\d{10,15}$/.test(passengerDetails.passenger_phone)) return setError('Please enter a valid phone number');
  //   setError('');
  //   return true;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) return;
    if (!localUser) {
      alert('Please login first.');
      return onClose();
    }
    setIsSubmitting(true);
    try {
      const bookingData = {
        ...selectedItem,
        travel_type: type,
        user_id: localUser?.Userdata?.user?.id || null,
        passenger_name: passengerDetails.passenger_name,
        passenger_email: passengerDetails.passenger_email,
        passenger_phone: passengerDetails.passenger_phone,
        travelers: Number(passengerDetails.travelers),
        cabin: passengerDetails.cabin,
        status: 'UNCONFIRMED',
        departure_date: selectedItem.departure_date || new Date().toISOString().split('T')[0],
      };

      await TravelBooking(bookingData);
      navigate('/tickets', { state:{ticket: bookingData }});
    } catch (err) {
      setError('Failed to book: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-[#d72f18]/10 p-4 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {getTravelIcon()}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Confirm Your Booking</h3>
                <p className="text-sm text-gray-500">Complete your travel details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 transition"
              aria-label="Close modal"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Travel Summary */}
          <div className="p-5 space-y-4">
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-xs text-gray-500 uppercase">Travel Type</p>
                <p className="capitalize font-medium">{type}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase">Provider</p>
                <p className="font-medium">{selectedItem.provider}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-3">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Departure</p>
                  <p className="font-semibold">{selectedItem.from_location}</p>
                  <p className="text-xs text-gray-600 flex justify-center items-center gap-1 mt-1">
                    <Clock size={12} /> {selectedItem.departure_time}
                  </p>
                </div>

                <div className="relative px-2">
                  <div className="w-16 h-px bg-gray-300">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white">
                      <ArrowRight className="text-gray-400" size={16} />
                    </div>
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500">
                      {selectedItem.duration}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500">Arrival</p>
                  <p className="font-semibold">{selectedItem.to_location}</p>
                  <p className="text-xs text-gray-600 flex justify-center items-center gap-1 mt-1">
                    <Clock size={12} /> {selectedItem.arrival_time}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm mt-4">
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-gray-500" />
                  {selectedItem.departure_date}
                </div>
                <div className="text-blue-700 bg-blue-50 px-2 py-1 rounded text-xs">
                  {selectedItem.available_seats} seats left
                </div>
              </div>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="p-5 space-y-4">
            <h4 className="font-medium flex items-center gap-2 text-gray-800">
              <User size={18} className="text-[#d72f18]" />
              Passenger Information
            </h4>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <div className="flex items-center gap-2 text-red-700 text-sm">
                  <Info size={16} /> {error}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="passenger_name"
                  value={passengerDetails.passenger_name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="passenger_email"
                    value={ passengerDetails.passenger_email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="passenger_phone"
                    value={ passengerDetails.passenger_phone}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    placeholder="9876543210"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                  <input
                    type="number"
                    name="travelers"
                    min={1}
                    value={passengerDetails.travelers}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Class</label>
                  <select
                    name="cabin"
                    value={passengerDetails.cabin}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="p-5 bg-gray-50">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm text-gray-500">Total Price</p>
                <p className="text-2xl font-bold text-[#d72f18]">₹{selectedItem.price}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>Includes all taxes</p>
                <p>Free cancellation</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#d72f18] text-white rounded-lg hover:bg-[#b52011] flex items-center gap-2 disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CheckCircle size={18} />
                )}
                <span>{isSubmitting ? 'Processing...' : 'Confirm Booking'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookNowModal;
