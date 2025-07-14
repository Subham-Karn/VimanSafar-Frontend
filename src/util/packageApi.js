import axios from "axios";

const BASE_URL = 'http://localhost:4000/api/package';

export const getAllPackages = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get-all-packages`);    
    return res.data; 
  } catch (error) {
    console.error('Error fetching packages:', error.message);
    throw new Error('Something went wrong while fetching packages');
  }
};

export const createPackageBooking = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/create-package-booking`, data);    
    return res.data; 
  } catch (error) {
    console.error('Error creating package booking:', error.message);
    throw new Error('Something went wrong while creating package booking');
  }
};


export const getAllPackageBookings = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get-all-package-bookings`);    
    return res.data; 
  } catch (error) {
    console.error('Error fetching package bookings:', error.message);
    throw new Error('Something went wrong while fetching package bookings');
  }
}
