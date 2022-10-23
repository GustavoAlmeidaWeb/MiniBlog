import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
// import userReducer from '../slices/userSlice.js';
// import photoReducer from '../slices/photoSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // user: userReducer,
        // photo: photoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }),
})
