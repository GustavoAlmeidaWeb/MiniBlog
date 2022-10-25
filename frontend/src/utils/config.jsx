import axios from 'axios';

export const api = import.meta.env.VITE_API;
export const uploads = import.meta.env.VITE_API_UPLOADS;

export const setTokenHeaders = (token) => {

  axios.defaults.headers['Authorization'] = `Bearer ${token}`;

}
