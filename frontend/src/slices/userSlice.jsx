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

// Get user profile by Id
export const getProfileById = createAsyncThunk('user/userprofile', async (id, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await userService.getProfileById(id, token);
    return res.data;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

// Get user profile
export const updateProfile = createAsyncThunk('user/update', async (userData, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await userService.updateProfile(userData, token);
    return res;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

// Delete your profile
export const deleteProfile = createAsyncThunk('user/delete', async (_, thunkAPI) => {

  try {

    const token = thunkAPI.getState().auth.user.data.token;
    const res = await userService.deleteProfile(token);
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
      .addCase(getProfileById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = 'Perfil atualizado com sucesso.';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = 'Conta excluída com sucesso.';
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })
  },
});

export const { resetUserStates } = userSlice.actions;
export default userSlice.reducer;
