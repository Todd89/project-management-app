/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import httpClient from '../../API/api';
import { USER_STATUS } from '../../constant/constant';
import { INewUser, IUser, IEditUser, IDeleteUser } from '../../interface/types';

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
    dispatch(setUserStatus('Registered'));
  } else dispatch(setUserStatus(USER_DATA));
});

export const getUserToken = createAsyncThunk('getUserToken', async (user: IUser, { dispatch }) => {
  const TOKEN = await httpClient.getUserToken(user);
  if (TOKEN !== USER_STATUS.NOT_FOUND) {
    dispatch(setUserToken(TOKEN));
    dispatch(setUserStatus('Authorized'));
  } else dispatch(setUserStatus(USER_STATUS.NOT_FOUND));
  console.log(TOKEN);
});

export const editUserProfile = createAsyncThunk(
  'editUserProfile',
  async (user: IEditUser, { dispatch }) => {
    const NEW_USER = await httpClient.updateUser(user.ID, user.token, user.user);
    if (NEW_USER && NEW_USER !== USER_STATUS.EDIT_ERROR) {
      console.log(NEW_USER, 'NEW_USER');
      dispatch(setRegisterUserData(NEW_USER));
      dispatch(setUserStatus(USER_STATUS.EDIT_SUCCESS));
    } else if (NEW_USER === USER_STATUS.EDIT_ERROR) {
      dispatch(setUserStatus(USER_STATUS.EDIT_ERROR));
    }
  }
);

export const deleteUserProfile = createAsyncThunk(
  'deleteUserProfile',
  async (user: IDeleteUser, { dispatch }) => {
    const NEW_USER = await httpClient.deleteUserByID(user.ID, user.token);
    if (NEW_USER === USER_STATUS.DELETE_SUCCESS) {
      dispatch(setUserStatus(USER_STATUS.DELETE_SUCCESS));
    } else {
      dispatch(setUserStatus('Something wrong'));
    }
  }
);

const userReducer = createSlice({
  name: 'UserLogin',
  initialState: userState,
  reducers: {
    setUserToken: (state, action) => {
      return { ...state, token: action.payload.token };
    },
    setRegisterUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setUserStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
    setAuthorizedUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserStatus: (state, action) => {
      const clearState = {
        name: '',
        login: '',
        password: '',
        id: '',
        token: '',
        status: 'Unregister',
      };
      return { ...state, ...clearState };
    },
  },
});

export const {
  setUserToken,
  setRegisterUserData,
  setUserStatus,
  clearUserStatus,
  setAuthorizedUserData,
} = userReducer.actions;
export default userReducer.reducer;
