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

// Get posts by User Friend
const getUserPostsById = async (id, token) => {

  setTokenHeaders(token);
  const res = await axios.get(`${api}/posts/user/${id}`);
  return res;

}

// Create new post
const postCreate = async (data, token) => {

  setTokenHeaders(token);
  const res = await axios.post(`${api}/posts/create`, data);
  return res;

}

// Delete a post
const deletePost = async (id, token) => {

  setTokenHeaders(token);
  const res = await axios.delete(`${api}/posts/delete/${id}`);
  return res;

}

// Update a post
const updatePost = async (id, data, token) => {

  setTokenHeaders(token);
  const res = await axios.put(`${api}/posts/update/${id}`, data);
  return res;

}

// Insert a comment on post
const commentCreate = async (id, comment, token) => {

  setTokenHeaders(token);
  const res = await axios.post(`${api}/posts/${id}/comment`, { comment });
  return res;

}

// Methods exports
const postService = {
  getPost,
  getAllPosts,
  getUserPosts,
  getUserPostsById,
  postCreate,
  deletePost,
  updatePost,
  commentCreate,
};

export default postService;
