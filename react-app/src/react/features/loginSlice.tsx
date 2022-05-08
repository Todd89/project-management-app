import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpClient from '../../API/api';
import { INewUser, IUser } from '../../interface/types';

const userState = {
  name: '',
  login: '',
  password: '',
  id: '',
  token: '',
  status: 'Unregister',
};

export const setNewUser = createAsyncThunk('setNewUser', async (user: INewUser, { dispatch }) => {
  const USER_DATA = await httpClient.setNewUser(user);
  if (typeof USER_DATA !== 'string') {
    dispatch(setRegisterUserData({ ...user, id: USER_DATA.id }));
    dispatch(setUserStatus(''));
  } else dispatch(setUserStatus(USER_DATA));
});

export const getUserToken = createAsyncThunk('getUserToken', async (user: IUser, { dispatch }) => {
  const TOKEN = await httpClient.getUserToken(user);
  if (typeof TOKEN !== 'string') {
    dispatch(setUserToken(TOKEN));
    dispatch(setUserStatus(''));
  } else dispatch(setUserStatus(TOKEN));
});

const userReducer = createSlice({
  name: 'UserLogin',
  initialState: userState,
  reducers: {
    setUserToken: (state, action) => {
      return { ...state, token: action.payload };
    },
    setRegisterUserData: (state, action) => {
      console.log(action, 'action');
      return { ...state, ...action.payload };
    },
    setUserStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setUserToken, setRegisterUserData, setUserStatus } = userReducer.actions;
export default userReducer.reducer;
