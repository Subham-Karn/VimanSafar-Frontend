import axios from "axios";

const BASE_URL = 'http://localhost:4000/api/auth';

export const login = async (email, password) => {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    if (!response) {
      throw new Error('Something went wrong');
    }
    return response.data;
};

export const signup = async (userData) => {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    if (!response) {
      throw new Error('Something went wrong ' + response.message);
    }
    return response.data;
};

export const loginWithLink = async (email) => {
    const response = await axios.post(`${BASE_URL}/login-with-link` , {email});
     if(!response){
      throw new Error('Something went wrong');
     }
    return response.data;
}

export const logout = async () => {
    const response = await axios.post(`${BASE_URL}/logout`);
    if (!response) {
      throw new Error('Something went wrong');
    }
    return response.data;
};