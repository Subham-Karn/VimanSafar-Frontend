import React, { useState } from 'react';
import { Calendar, Mail, MapPin, Phone, User, Users } from 'lucide-react';

const BookNow = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    destination: '',
    travelers: 1,
    departureDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Data:', formData);
    // You can connect with Supabase or backend API here
    alert('Booking submitted successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md my-8">
      <h2 className="text-2xl font-bold mb-6 text-[#d72f18] text-center">Book Your Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <User className="text-[#d72f18]" />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-[#d72f18]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Mail className="text-[#d72f18]" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-[#d72f18]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Phone className="text-[#d72f18]" />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-[#d72f18]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <MapPin className="text-[#d72f18]" />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-[#d72f18]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Users className="text-[#d72f18]" />
          <input
            type="number"
            name="travelers"
            placeholder="Number of Travelers"
            value={formData.travelers}
            onChange={handleChange}
            min={1}
            className="w-full border p-2 rounded focus:outline-[#d72f18]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="text-[#d72f18]" />
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded focus:outline-[#d72f18]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#d72f18] text-white py-2 rounded hover:bg-[#b52011] transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookNow;
