import axios from 'axios';
import { api, setTokenHeaders } from "../utils/config";

// Get user profile
const getProfile = async (token) => {

  setTokenHeaders(token);
  const res = await axios.get(`${api}/users/profile`);
  return res;

}

// Get user profile by ID
const getProfileById = async (id, token) => {

  setTokenHeaders(token);
  const res = await axios.get(`${api}/users/${id}`);
  return res;

}

// Update profile
const updateProfile = async (data, token) => {

  setTokenHeaders(token);
  const res = await axios.put(`${api}/users/update`, data);
  return res;

}

// Delete your profile
const deleteProfile = async (token) => {

  setTokenHeaders(token);
  localStorage.removeItem('miniblog_user');
  const res = await axios.delete(`${api}/users/delete`);
  return res;

}

// Methods exports
const userService = {
  getProfile,
  getProfileById,
  updateProfile,
  deleteProfile,
};

export default userService;
