import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/loginSlice';
import dataSlice from './features/dataSlice';
import usersSlice from './features/usersSlice';
import languageSlice from './features/languageState';

const store = configureStore({
  reducer: {
    loginData: userReducer,
    usersFunctions: usersSlice,
    dataFunctions: dataSlice,
    userLanguage: languageSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type TStore = ReturnType<typeof store.getState>;
export default store;
