import React from 'react';
import { ShieldCheck, Headset, Clock, Globe } from 'lucide-react';

const ReasonsToBook = () => {
  const reasons = [
    {
      icon: <ShieldCheck size={40} className="text-[#d72f18]" />,
      title: "Secure Booking",
      description: "Your data is protected with our advanced security measures"
    },
    {
      icon: <Headset size={40} className="text-[#d72f18]" />,
      title: "24/7 Support",
      description: "Our team is always ready to assist you anytime"
    },
    {
      icon: <Clock size={40} className="text-[#d72f18]" />,
      title: "Instant Confirmation",
      description: "Get immediate booking confirmation"
    },
    {
      icon: <Globe size={40} className="text-[#d72f18]" />,
      title: "Global Coverage",
      description: "Access to thousands of destinations worldwide"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Book With Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="flex justify-center mb-4">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsToBook;