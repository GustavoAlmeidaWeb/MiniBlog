import axios from 'axios';
import { api, setTokenHeaders } from "../utils/config";

// Get all Posts
const getAllPosts = async () => {

  const res = await axios.get(`${api}/posts`);
  return res;
}

// Get a post by id
const getPost = async (id, token) => {

  setTokenHeaders(token);
  const res = await axios.get(`${api}/posts/${id}`);
  return res;

}

// Get users posts
const getUserPosts = async (token) => {

  setTokenHeaders(token);
  const res = await axios.get(`${api}/posts/dashboard`);
  return res;

}


// Methods exports
const postService = {
  getPost,
  getAllPosts,
  getUserPosts,
};

export default postService;
