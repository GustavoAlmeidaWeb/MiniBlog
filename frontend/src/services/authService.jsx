import axios from 'axios';
import { api } from '../utils/config';

const register = async (data) => {

  const res = await axios.post(`${api}/users/register`, data);
  return res;

}

const login = async (data) => {

  const res = await axios.post(`${api}/users/login`, data);
  return res;

}

const logout = async () => {

  localStorage.removeItem('miniblog_user');

}

const authService = {
  register,
  login,
  logout,
}

export default authService;
