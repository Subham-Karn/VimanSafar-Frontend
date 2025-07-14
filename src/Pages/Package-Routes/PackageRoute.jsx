import { usePackage } from '../../hooks/useHook';
import PackageBookingConfirmModal from '../../Mondals/Packages/PackageBookingConfirm';
import { useState } from 'react';

const PackageRoute = () => {
  const { packages, loading, error } = usePackage();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const localPackage = packages?.packages || [];
  const handleBooking = (pkg) => {
    setSelectedPackage(pkg);
    setIsBookingOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">Loading packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-red-600">Error loading packages: {error.message}</div>
      </div>
    );
  }

  if (!localPackage || localPackage.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-2xl text-gray-600">No packages available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold text-[#d72f18] mb-8">Our Travel Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {localPackage.map((packageItem) => (
          <div key={packageItem.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#d72f18] group">
            {/* Package Image */}
            <div className="h-48 overflow-hidden relative">
              <img 
                src={packageItem.image_url}
                alt={packageItem.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium">Explore Now →</span>
              </div>
            </div>

            {/* Package Details */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#d72f18] transition-colors duration-200">
                  {packageItem.title}
                </h3>
                <span className="bg-[#d72f18] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                  ₹{Number(packageItem.price || 0).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{packageItem.description}</p>

              <div className="mb-4">
                <div className="flex items-center text-gray-500 mb-3">
                  <svg className="w-5 h-5 mr-2 text-[#d72f18]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{packageItem.duration || 'Duration not available'}</span>
                </div>

                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-[#d72f18]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Highlights
                </h4>

                <ul className="space-y-2">
                  {(Array.isArray(packageItem.highlights) ? packageItem.highlights.slice(0, 3) : []).map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#d72f18] mr-2 mt-1">•</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inclusions */}
              <div className="flex flex-wrap gap-2 mb-5">
                {packageItem.food_included && (
                  <span className="bg-[#d72f18] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Meals
                  </span>
                )}
                {packageItem.guide_included && (
                  <span className="bg-[#d72f18] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Guide
                  </span>
                )}
              </div>

              {/* Book Now Button */}
              <button
                onClick={() => handleBooking(packageItem)}
                className="w-full bg-[#d72f18] hover:bg-[#b82612] text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Book Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isBookingOpen && selectedPackage && (
        <PackageBookingConfirmModal
          packageItem={selectedPackage}
          onClose={() => setIsBookingOpen(false)}
          isOpen={isBookingOpen}
        />
      )}
    </div>
  );
};

export default PackageRoute;
