import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IState } from '../../../interface/types';
import './WelcomeRoute.css';
import LogInButton from '../reusableComponents/logInButton/LogInButton';
import ToMainRoute from '../reusableComponents/toMainRouteButton/toMainRouteButton';
import SignUpButton from '../reusableComponents/signUpButton/SignUpButton';
import RSSchoolLogo from '../reusableComponents/RSSchoolLogo/RSSchoolLogo';
import AppLogo from '../reusableComponents/appLogo/AppLogo';
import { useTranslation } from 'react-i18next';
import { checkToken } from '../../../service/servise';

const WelcomeRoute: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const userState = useSelector((state: IState) => state.loginData);
  const dispatch = useDispatch();

  useEffect(() => {
    checkToken(dispatch, navigate);
  }, []);
  return (
    <section className="welcome-page">
      {userState.token ? (
        <ToMainRoute />
      ) : (
        <>
          <Link to="/signup">
            <SignUpButton />
          </Link>
          <Link to="/login">
            <LogInButton />
          </Link>
        </>
      )}
      <div className="welcome-logo">
        <AppLogo />
      </div>
      <article className="welcome-page_app">
        <h1 className="app-title">Project management app</h1>
        <div className="app-text">{t('welcomeRoute.description')}</div>
      </article>
      <article className="welcome-page_team">
        <h3>{t('welcomeRoute.team')}</h3>
      </article>
      <article className="welcome-page_course">
        <div className="course-title">
          <RSSchoolLogo />
          <div className="course-title_name">
            React <br /> 2022 Q1
          </div>
        </div>
        <div className="course-text">{t('welcomeRoute.RSS')}</div>
      </article>
    </section>
  );
};
export default WelcomeRoute;
