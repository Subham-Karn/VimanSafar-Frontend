import axios from "axios";

const BASE_URL = 'http://localhost:4000/api/travel-booking';

export const getAllTravels = async () => {
    const response = await fetch(`${BASE_URL}/get-all-travels`);
    if (!response) {
        throw new Error('Something went wrong');
    }
    return response.json();
};

export const createTravelBooking = async (data) =>{
  const res = await axios.post(`${BASE_URL}/create-travel-booking`, data);
  if (!res) {
    throw new Error('Something went wrong');
  }
  return res.json();
}

export const TravelBooking = async (data) =>{
  const res = await axios.post(`${BASE_URL}/create-travel-booking`, data);
  if (!res) {
    throw new Error('Something went wrong');
  }
  return res.data;
}

export const getAllTickets = async () =>{
  const res = await axios.get(`${BASE_URL}/get-travel-bookings`);
  if (!res) {
    throw new Error('Something went wrong');
  }
  return res.data;
}