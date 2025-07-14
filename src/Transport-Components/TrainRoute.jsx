import React, { useState, useEffect } from 'react';
import { useTravel } from '../hooks/useHook';
import { CalendarDays, Clock, MapPin, TrainFront, ArrowRight } from 'lucide-react';
import BookingModal from '../Mondals/Packages/PackageTickets';

const TrainRoute = () => {
    const { travels, loading, error  , setNavName} = useTravel();
    const [trains, setTrains] = useState([]);
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    useEffect(() => {
        if (travels?.travels) {
            const filteredTrains = travels.travels.filter((train) => train?.type === 'train');
            setTrains(filteredTrains);
            setNavName('Trains');
        }
    }, [travels , setNavName]);

    const handleBooking = (train) => {
        console.log('Booked Train:', train);
        setIsBookingOpen(false);
        // Add any additional booking logic here
    };

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto mt-6 p-4 text-center">
                <div className="animate-pulse flex flex-col space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-5xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                <h2 className="text-xl font-semibold mb-2">Error Loading Trains</h2>
                <p>{error.message || 'Failed to load train data'}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (trains.length === 0 && !loading) {
        return (
            <div className="max-w-5xl mx-auto mt-6 p-4 text-center">
                <div className="bg-gray-50 p-8 rounded-lg">
                    <TrainFront className="mx-auto text-gray-400" size={48} />
                    <h3 className="text-lg font-medium text-gray-700 mt-4">No Trains Available</h3>
                    <p className="text-gray-500 mt-1">There are currently no trains scheduled for this route.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-[#d72f18] border-b pb-2 flex items-center">
                <TrainFront className="mr-2" size={24} />
                Available Trains
            </h2>

            {trains.map((train) => (
                <div
                    key={train.id}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-gray-100"
                >
                    {/* Train Info */}
                    <div className="flex items-start space-x-4 w-full md:w-2/5 mb-4 md:mb-0">
                        <div className="bg-[#d72f18]/10 p-2 rounded-full">
                            <TrainFront className="text-[#d72f18]" size={28} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">{train.provider || 'Unnamed Train'}</h3>
                            <p className="text-sm text-gray-500">
                                {train.provider_number || 'N/A'} | {train.class || 'General'}
                            </p>
                            <div className="mt-2 text-sm">
                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                                    {train.type || 'Express'}
                                </span>
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
                                    <p className="text-sm font-medium">{train?.from_location || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <Clock size={12} className="inline mr-1" />
                                        {train?.departures || '22:00'}
                                    </p>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="flex flex-col items-center w-full md:w-2/12">
                                <div className="hidden md:block">
                                    <ArrowRight className="text-gray-400" />
                                </div>
                                <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                    {train?.duration || 'N/A'}
                                </div>
                            </div>

                            {/* To Location */}
                            <div className="flex items-start space-x-2 w-full md:w-5/12">
                                <MapPin size={18} className="text-[#d72f18] mt-0.5" />
                                <div>
                                    <p className="text-xs text-gray-500">To</p>
                                    <p className="text-sm font-medium">{train?.to_location || 'Unknown'}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        <Clock size={12} className="inline mr-1" />
                                        {train?.arrival || '23:00'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price and Book Button */}
                    <div className="flex flex-col items-end w-full md:w-1/5">
                        <div className="text-[#d72f18] font-bold text-lg mb-2">
                            {train?.price ? `₹${train.price}` : '₹0'}
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 mb-3">
                            <CalendarDays size={12} className="text-[#d72f18]" />
                            <span>{train?.departure || '2023-09-01'}</span>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedTrain(train);
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
                <BookingModal
                    isOpen={isBookingOpen}
                    onClose={() => setIsBookingOpen(false)}
                    selectedItem={selectedTrain}
                    onBook={handleBooking}
                    type="Train"
                />
            )}
        </div>
    );
};

export default TrainRoute;