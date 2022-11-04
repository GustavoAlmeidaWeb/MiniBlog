import axios from 'axios';
import { api, setTokenHeaders } from "../utils/config";

// Get user profile
const getProfile = async (token) => {

  setTokenHeaders(token);
  const res = await axios.get(`${api}/users/profile`);
  return res;

}

// Update profile
const updateProfile = async (data, token) => {

  setTokenHeaders(token);
  const res = await axios.put(`${api}/users/update`, data);
  return res;

}

// Methods exports
const userService = {
  getProfile,
  updateProfile,
};

export default userService;
