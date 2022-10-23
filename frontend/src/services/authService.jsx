import axios from 'axios';
import { api } from '../utils/config';

const register = async (data) => {

  try {

    const res = await axios.post(`${api}/users/register`, data);
    return res;

  } catch (error) {

    console.log(error);

  }

}

const login = async (data) => {

}

const logout = async () => {

}

const authService = {
  register,
  login,
  logout,
}

export default authService;
