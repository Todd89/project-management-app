import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import httpClient from '../../../API/api';
import { ILoginState, IState } from '../../../interface/types';
import { setAuthorizedUserData, setUserToken } from '../../../react/features/loginSlice';
import './WelcomeRoute.css';
import LogInButton from '../reusableComponents/logInButton/LogInButton';
import SignUpButton from '../reusableComponents/signUpButton/SignUpButton';
import RSSchoolLogo from '../reusableComponents/RSSchoolLogo/RSSchoolLogo';

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
        const tokenObject = {
          token: TOKEN,
        };
        dispatch(setUserToken(tokenObject));
        navigate('/main');
      }
    };
    if (TOKEN) {
      checkToken(TOKEN);
    }
  }, []);
  return (
    <section className="welcome-page">
      <div className="welcome-page_blur">
        <Link to="/signup">
          <SignUpButton />
        </Link>
        <Link to="/login">
          <LogInButton />
        </Link>
        <article className="welcome-page_app">
          <h1 className="app-title">Project management app</h1>
          <div className="app-text">
            Project management app – приложение помогающее достичь поставленные задачи отдельному
            человеку в команде или группе разработчиков.
          </div>
        </article>
        <article className="welcome-page_team">
          <h3>Our team</h3>
        </article>
        <article className="welcome-page_course">
          <div className="course-title">
            <RSSchoolLogo />
            <div className="course-title_name">
              React <br /> 2022 Q1
            </div>
          </div>
          <div className="course-text">
            Онлайн курс «Разработка на React» - это бесплатный курс от сообщества The Rolling
            Scopes.
          </div>
        </article>
      </div>
    </section>
  );
};
export default WelcomeRoute;
