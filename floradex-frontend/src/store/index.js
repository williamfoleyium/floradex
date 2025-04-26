import { configureStore } from '@reduxjs/toolkit';
import plantsReducer from '../features/plants/plantsSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    plants: plantsReducer,
    auth: authReducer
  },
});
