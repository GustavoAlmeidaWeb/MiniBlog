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

// Get a post by id
export const getUserPostsById = createAsyncThunk("post/postsuserid", async (id, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await postService.getUserPostsById(id, token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
})


// Create new post
export const postCreate = createAsyncThunk("post/create", async (post, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await postService.postCreate(post, token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
})


// Delete a post
export const deletePost = createAsyncThunk("post/delete", async (id, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await postService.deletePost(id, token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
})


// Update a post
export const updatePost = createAsyncThunk("post/update", async (postData, thunkAPI) => {

  const { id, formData } = postData;

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await postService.updatePost(id, formData, token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
})


// Create comment a post
export const commentCreate = createAsyncThunk("comment/create", async (commentData, thunkAPI) => {

  const { id, comment } = commentData;

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await postService.commentCreate(id, comment, token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
})

// Delete a comment
export const commentDelete = createAsyncThunk("comment/delete", async (id, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await postService.commentDelete(id, token);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
})

// Search Posts
export const searchPosts = createAsyncThunk("posts/search", async (query, thunkAPI) => {

  try {

    const res = await postService.searchPosts(query);

    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }
});



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
      .addCase(getUserPostsById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserPostsById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(postCreate.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(postCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.post = action.payload;
        state.message = 'Post publicado com sucesso.';
      })
      .addCase(postCreate.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.post = action.payload;
        state.message = 'Post excluído com sucesso.';
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.post = action.payload;
        state.message = 'Post atualizado com sucesso.';
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(commentCreate.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(commentCreate.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = 'Comentário adicionado com sucesso.';
      })
      .addCase(commentCreate.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(commentDelete.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(commentDelete.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = 'Comentário excluído com sucesso.';
      })
      .addCase(commentDelete.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.posts = action.payload;
      })
  },
});

export const { resetPostStates } = postSlice.actions;
export default postSlice.reducer;
