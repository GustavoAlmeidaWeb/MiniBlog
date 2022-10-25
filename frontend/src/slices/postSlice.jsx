import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../services/postService';

const initialState = {
  posts: null,
  post: null,
  error: false,
  success: false,
  loading: false,
};

// Get a post by id
export const getPost = createAsyncThunk("post/getpost", async (id, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await postService.getPost(id, token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
})

// Get All Posts
export const getAllPosts = createAsyncThunk("posts/getposts", async (_, thunkAPI) => {

  try {

    const res = await postService.getAllPosts();

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
});

// Get a post by id
export const getUserPosts = createAsyncThunk("post/userposts", async (_, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await postService.getUserPosts(token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
})


export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
      resetPostStates: (state) => {
          state.loading = false;
          state.error = false;
          state.success = false;
          state.message = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
          state.loading = true;
          state.error = false;
      })
      .addCase(getPost.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.post = action.payload;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.posts = action.payload;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.posts = action.payload;
      })
  },
});

export const { resetPostStates } = postSlice.actions;
export default postSlice.reducer;
