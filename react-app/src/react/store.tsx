import { configureStore } from '@reduxjs/toolkit';
import boardsSlice from './features/boardsSlice';
import columnsSlice from './features/columnsSlice';
import userReducer from './features/loginSlice';
import tempSlice from './features/tempSlice';
import usersSlice from './features/usersSlice';

const store = configureStore({
  reducer: {
    loginData: userReducer,
    usersFunctions: usersSlice,
    boardsFunctions: boardsSlice,
    columnsFunctions: columnsSlice,
    tempFunctions: tempSlice, //remove
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type TStore = ReturnType<typeof store.getState>;
export default store;
