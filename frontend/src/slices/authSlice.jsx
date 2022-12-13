import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = { data: JSON.parse(localStorage.getItem('miniblog_user'))};

const initialState = {
    user: user || null,
    error: false,
    success: false,
    loading: false,
};

// Register an user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {

  try {

    const res = await authService.register(user);
    return res;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

// Login an user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {

  try {

    const res = await authService.login(user);

    if(res.data.id) {
      localStorage.setItem('miniblog_user', JSON.stringify(res.data));
    }

    return res;

  } catch (e) {

    // Check for errors
    return thunkAPI.rejectWithValue(e.response.data.errors[0]);

  }

});

// logout
export const logout = createAsyncThunk('auth/logout', async () => {

  await authService.logout();

})


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      resetAuthStates: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = null;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = 'Cadastro realizado com sucesso';
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
        state.message = 'Login realizado com sucesso.';
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = null;
      })
  },
});

export const { resetAuthStates } = authSlice.actions;
export default authSlice.reducer;
