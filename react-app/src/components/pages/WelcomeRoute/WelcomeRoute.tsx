import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import httpClient from '../../../API/api';
import { ILoginState, IState } from '../../../interface/types';
import { setAuthorizedUserData, setUserToken } from '../../../react/features/loginSlice';
import './WelcomeRoute.css';

type IToken = {
  iat: number;
  login: string;
  userId: string;
};

const WelcomeRoute: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const TOKEN = localStorage.getItem('token');
    const checkToken = async (TOKEN: string) => {
      const ALL_USERS = await httpClient.getAllUsers(TOKEN);
      const decoded: IToken = jwt_decode(TOKEN);
      const USER = ALL_USERS.filter((el: ILoginState) => {
        return el.login === decoded.login;
      });
      dispatch(setAuthorizedUserData(USER[0]));
      if (ALL_USERS) {
        dispatch(setUserToken(TOKEN));
        navigate('/main');
      }
    };
    if (TOKEN) {
      checkToken(TOKEN);
    }
  }, []);
  return (
    <section className="welcome-page">
      <Link to="/login">
        <button className="button-login" type="button">
          Log in
        </button>
      </Link>
      <Link to="/signup">
        <button className="button-signUp" type="button">
          Sign Up
        </button>
      </Link>
      <article>
        <h1>Project management app</h1>
      </article>
      <article>Our team</article>
      <article>React 2022 Q1</article>
    </section>
  );
};
export default WelcomeRoute;
