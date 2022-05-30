import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpClient from '../../API/api';
import { TUsers } from '../../interface/interfaces';

export const initialState: TUsers = {
  usersArray: [],
};

export const getAllUsersApi = createAsyncThunk(
  'getAllUsersApi',
  async (token: string, { dispatch }) => {
    const usersAPI = await httpClient.getAllUsers(token);
    dispatch(setUsersArray(usersAPI));
  }
);

export const usersSlice = createSlice({
  name: 'usersFunctions',
  initialState,
  reducers: {
    setUsersArray: (state, action) => {
      return { ...state, usersArray: action.payload };
    },
  },
});

export const { setUsersArray } = usersSlice.actions;

export default usersSlice.reducer;
