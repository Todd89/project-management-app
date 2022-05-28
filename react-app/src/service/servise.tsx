/* eslint-disable @typescript-eslint/no-explicit-any */
import httpClient from '../API/api';
import { ILoginState, IToken } from '../interface/types';
import jwt_decode from 'jwt-decode';
import { setAuthorizedUserData, setUserToken } from '../react/features/loginSlice';

export const checkToken = (dispatch: any, navigate: any) => {
  const TOKEN = localStorage.getItem('token');
  const check = async (TOKEN: string) => {
    const ALL_USERS = await httpClient.getAllUsers(TOKEN);
    const decoded: IToken = jwt_decode(TOKEN);
    const USER = ALL_USERS.filter((el: ILoginState) => {
      return el.login === decoded.login;
    });
    dispatch(setAuthorizedUserData(USER[0]));
    if (ALL_USERS) {
      const tokenObject = {
        token: TOKEN,
      };
      dispatch(setUserToken(tokenObject));
    } else {
      navigate('/');
      localStorage.removeItem('token');
    }
  };
  if (TOKEN) {
    check(TOKEN);
  }
};
