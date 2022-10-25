import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
};


// Get user profile
export const getProfile = createAsyncThunk('user/profile', async (_, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await userService.getProfile(token);
    return res;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      resetUserStates: (state) => {
          state.loading = false;
          state.error = false;
          state.success = false;
          state.message = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
          state.loading = true;
          state.error = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
      })
      // .addCase(getAllPosts.pending, (state) => {
      //   state.loading = true;
      //   state.error = false;
      // })
      // .addCase(getAllPosts.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.success = true;
      //     state.error = null;
      //     state.posts = action.payload;
      // })
  },
});

export const { resetUserStates } = userSlice.actions;
export default userSlice.reducer;
