import React, { useState, useEffect } from 'react';
import { Tag, ArrowRight, ArrowLeft } from 'lucide-react';

const ExcitingDeals = () => {
  const deals = [
    {
      title: "Summer Getaway",
      discount: "40% OFF",
      description: "Book your summer vacation now!",
      code: "SUMMER40",
      image: "/images/summer-deal.jpg",
      expiry: "Offer ends June 30"
    },
    {
      title: "Weekend Special",
      discount: "35% OFF",
      description: "Perfect short trips near you",
      code: "WEEKEND35",
      image: "/images/weekend-deal.jpg",
      expiry: "Limited time offer"
    },
    {
      title: "Family Package",
      discount: "25% OFF",
      description: "Special rates for family bookings",
      code: "FAMILY25",
      image: "/images/family-deal.jpg",
      expiry: "Valid all season"
    },
    {
      title: "Last Minute Deal",
      discount: "30% OFF",
      description: "Spontaneous trips made affordable",
      code: "LASTMIN30",
      image: "/images/lastmin-deal.jpg",
      expiry: "Limited availability"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-rotate deals every 5 seconds
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % deals.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, deals.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % deals.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Exciting Deals</h2>
          <p className="text-lg text-gray-600">Limited time offers for your next adventure</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Deal Card */}
          <div 
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
            key={currentIndex}
          >
            <div className="md:flex">
              {/* Image Section */}
              <div className="md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={deals[currentIndex].image} 
                  alt={deals[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#d72f18] text-white px-3 py-1 rounded-full flex items-center">
                  <Tag size={16} className="mr-1" />
                  <span className="text-sm font-bold">{deals[currentIndex].discount}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{deals[currentIndex].title}</h3>
                <p className="text-gray-600 mb-4">{deals[currentIndex].description}</p>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-[#d72f18]">{deals[currentIndex].discount}</span>
                    <span className="text-sm text-gray-500">{deals[currentIndex].expiry}</span>
                  </div>
                  <div className="bg-gray-100 p-2 rounded inline-block">
                    <p className="text-sm font-mono">Use code: <span className="font-bold">{deals[currentIndex].code}</span></p>
                  </div>
                </div>

                <button className="w-full bg-[#d72f18] hover:bg-[#b52011] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  Book Now <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
            aria-label="Previous deal"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all"
            aria-label="Next deal"
          >
            <ArrowRight size={24} className="text-gray-700" />
          </button>

          {/* Indicator Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {deals.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all ${currentIndex === index ? 'bg-[#d72f18] w-6' : 'bg-gray-300'}`}
                aria-label={`Go to deal ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExcitingDeals;