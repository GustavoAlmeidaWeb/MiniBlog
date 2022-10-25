import axios from 'axios';
import { api, setTokenHeaders } from "../utils/config";

// Get user profile
const getProfile = async (token) => {

  setTokenHeaders(token);
  const res = await axios.get(`${api}/users/profile`);
  return res;

}


// Methods exports
const userService = {
  getProfile,
};

export default userService;
