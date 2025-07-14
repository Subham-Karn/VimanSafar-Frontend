import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPackageBooking } from '../../util/packageApi';

const PackageBookingConfirmModal = ({ packageItem, onClose }) => {
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    name: localUser?.profile?.full_name || '',
    email: localUser?.Userdata?.user?.email || '',
    phone: localUser?.profile?.phone || '',
    guests: 1,
    date: '',
    specialRequests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, phone, guests, date, specialRequests } = formData;

  if (!name || !email || !phone || !guests || !date) {
    return alert('Please fill in all required fields.');
  }
  if(!localUser){
    alert('Please login first.');
    return navigate('/');
  }
  const payload = {
    user_name: name,
    email,
    phone,
    guests,
    departure_date: date,
    special_requests: specialRequests,
    user_id: localUser?.Userdata?.user?.id || null,
    travel_date: packageItem.date,
    // From packageItem
    package_title: packageItem.title,
    duration: packageItem.duration,
    price: packageItem.price,
    highlights: packageItem.highlights,
  };

  try {
    const response = await createPackageBooking(payload);

    if (response.error) {
      return alert(response.error);
    }

    console.log('Booking successful:', response);

    navigate('/mypackages', { state: { booking: packageItem, formData } });
    onClose();
  } catch (err) {
    console.error('Booking failed:', err);
    alert('Something went wrong. Please try again.');
  }
};


  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#d72f18] text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
              <p className="text-white/90 mt-1">{packageItem?.title || 'N/A'}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Package Summary */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Package Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{packageItem?.duration || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">
                    ₹{packageItem?.price?.toLocaleString() || '0'}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Highlights:</span>
                  <div className="text-right space-y-1">
                    {packageItem?.highlights?.slice(0, 3)?.map((item, i) => (
                      <div key={i} className="text-gray-700">• {item}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Inclusions</h3>
                <div className="flex flex-wrap gap-2">
                  {packageItem?.food_included && (
                    <span className="bg-[#d72f18]/10 text-[#d72f18] px-3 py-1 rounded-full text-xs">
                      Meals Included
                    </span>
                  )}
                  {packageItem?.guide_included && (
                    <span className="bg-[#d72f18]/10 text-[#d72f18] px-3 py-1 rounded-full text-xs">
                      Guide Included
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d72f18] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d72f18] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d72f18] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d72f18] focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d72f18] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d72f18] focus:border-transparent"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#d72f18] text-white rounded-lg hover:bg-[#b82612] transition flex items-center gap-2"
          >
            Confirm Booking
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageBookingConfirmModal;
