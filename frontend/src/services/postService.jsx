import axios from 'axios';
import { api } from "../utils/config";

// Get all Posts
const getAllPosts = async () => {

  const res = await axios({
    url: `${api}/posts`,
    method: 'GET'
  });

  return res;
}

// Get a post by id
const getPost = async (id, token) => {

  const res = await axios({
    url: `${api}/posts/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res;
}


// Methods exports
const postService = {
  getPost,
  getAllPosts,
};

export default postService;
