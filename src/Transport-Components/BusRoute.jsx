import React, { useState, useEffect } from 'react';
import { useTravel } from '../hooks/useHook';
import { CalendarDays, Clock, MapPin, Bus } from 'lucide-react';
import BookNowModal from '../Mondals/Confirm-Mondals/BookNowMondal';

/**
 * BusRoute component
 * 
 * Displays available bus routes with booking functionality
 * 
 * @returns {React.ReactElement} The rendered bus route component
 */
const BusRoute = () => {
    const { travels, loading, error , setNavName } = useTravel();
    const [buses, setBuses] = useState([]);
    const [selectedBus, setSelectedBus] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        if (travels?.travels) {
            const filteredBuses = travels.travels.filter(travel => travel?.type === 'bus');
            setBuses(filteredBuses);
            setNavName('Bus');
        }
    }, [travels , setNavName]);

    const handleBooking = (bus) => {
        console.log('Booked Bus:', bus);
        setIsBookingOpen(false);
        // Add any post-booking logic here
    };

    // Loading state
    if (loading) {
        return (
            <div className="max-w-5xl mx-auto mt-6 p-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="max-w-5xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Buses</h2>
                <p className="text-red-600">{error.message || 'Failed to load bus data'}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Empty state
    if (buses.length === 0 && !loading) {
        return (
            <div className="max-w-5xl mx-auto mt-6 p-4 text-center">
                <div className="bg-gray-50 p-8 rounded-lg">
                    <Bus className="mx-auto text-gray-400" size={48} />
                    <h3 className="text-lg font-medium text-gray-700 mt-4">No Buses Available</h3>
                    <p className="text-gray-500 mt-1">There are currently no buses scheduled for this route.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#d72f18] border-b pb-2 flex items-center">
                <Bus className="mr-2" size={24} />
                Available Buses
            </h2>

            {buses.map((bus) => (
                <div
                    key={bus.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-100"
                >
                    {/* Bus Info */}
                    <div className="flex items-start space-x-4 w-full md:w-2/5 mb-4 md:mb-0">
                        <div className="bg-[#d72f18]/10 p-2 rounded-full">
                            <Bus className="text-[#d72f18]" size={28} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{bus.provider || 'Unnamed Bus'}</h3>
                            <p className="text-sm text-gray-500 capitalize">
                                {bus.type || 'Standard'} • {bus.provider_number || 'N/A'}
                            </p>
                            <div className="mt-1 text-xs text-gray-500">
                                {bus.amenities?.join(' • ') || 'AC • WiFi • Charging'}
                            </div>
                        </div>
                    </div>

                    {/* Route Details */}
                    <div className="w-full md:w-2/5 mb-4 md:mb-0">
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                            {/* From Location */}
                            <div className="flex items-start space-x-2 w-full md:w-5/12">
                                <MapPin size={18} className="text-[#d72f18] mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">From</p>
                                    <p className="text-sm font-medium">{bus.from_location || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <Clock size={12} className="inline mr-1" />
                                        {bus.departure || '--:--'}
                                    </p>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="flex flex-col items-center w-full md:w-2/12">
                                <div className="hidden md:block">
                                    <span className="text-gray-400">→</span>
                                </div>
                                <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                    {bus.duration || 'N/A'}
                                </div>
                            </div>

                            {/* To Location */}
                            <div className="flex items-start space-x-2 w-full md:w-5/12">
                                <MapPin size={18} className="text-[#d72f18] mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">To</p>
                                    <p className="text-sm font-medium">{bus.to_location || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <Clock size={12} className="inline mr-1" />
                                        {bus.arrival_time || '--:--'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex flex-col items-end w-full md:w-1/5">
                        <div className="text-[#d72f18] font-bold text-lg mb-2">
                            {bus.price ? `₹${bus.price}` : '₹0'}
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
                            <CalendarDays size={12} className="text-[#d72f18]" />
                            <span>{bus.created_at && new Date(bus.created_at).toLocaleDateString() || 'Not specified'}</span>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedBus(bus);
                                setIsBookingOpen(true);
                            }}
                            className="bg-[#d72f18] text-white px-4 py-2 rounded hover:bg-[#b52011] transition text-sm w-full md:w-auto"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            ))}

            {/* Booking Modal */}
            {isBookingOpen && (
                <BookNowModal
                    type="bus"
                    selectedItem={selectedBus}
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    onConfirm={handleBooking}
                />
            )}
        </div>
    );
};

export default BusRoute;