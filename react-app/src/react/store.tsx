import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/loginSlice';

const store = configureStore({
  reducer: {
    loginData: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
