import React from 'react';
import { Tag } from 'lucide-react';

const ExcitingOffers = () => {
  const offers = [
    {
      title: "Early Bird Special",
      discount: "30% OFF",
      description: "Book 60 days in advance and save big",
      code: "EARLY30"
    },
    {
      title: "Weekend Getaway",
      discount: "25% OFF",
      description: "Special rates for weekend travels",
      code: "WEEKEND25"
    },
    {
      title: "Family Package",
      discount: "15% OFF",
      description: "Discounts for family bookings",
      code: "FAMILY15"
    }
  ];

  return (
    <section className="py-16 bg-[#f8f9fa]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Exciting Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <div key={index} className="bg-white border border-[#d72f18] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
              <div className="bg-[#d72f18] text-white p-4 flex items-center">
                <Tag className="mr-2" size={24} />
                <h3 className="text-xl font-bold">{offer.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-4xl font-bold text-[#d72f18] mb-2">{offer.discount}</p>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="bg-gray-100 p-2 rounded">
                  <p className="text-sm font-mono">Use code: <span className="font-bold">{offer.code}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExcitingOffers;