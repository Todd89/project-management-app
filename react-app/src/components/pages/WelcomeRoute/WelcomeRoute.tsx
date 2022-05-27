import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IState } from '../../../interface/types';
import './WelcomeRoute.css';
import LogInButton from '../reusableComponents/logInButton/LogInButton';
import ToMainRoute from '../reusableComponents/toMainRouteButton/toMainRouteButton';
import SignUpButton from '../reusableComponents/signUpButton/SignUpButton';
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
        <div className="app-text">Try it right now!</div>
      </article>
      <div className="information-block">
        <div className="information-block-part">
          <article className="info-part-block info-part-block-first">
            <h3 className="info-part-block-header">Create tasks boards</h3>
            <div className="info-part-block-list">
              <ul>
                <li>You can create your own tasks boards</li>
                <li>Organize tasks by types</li>
                <li>Authotize and get all possibilities</li>
              </ul>
            </div>
          </article>
          <div className="info-part-block-images"></div>
        </div>
        <div className="information-block-part">
          <div className="info-part-block-images-second"></div>
          <article className="info-part-block info-part-block-second">
            <h3 className="info-part-block-header">Add tasks</h3>
            <div className="info-part-block-list">
              <ul>
                <li>Manage by your tasks</li>
                <li>Work with your team</li>
                <li>Appoint a responsible</li>
              </ul>
            </div>
          </article>
        </div>
        <div className="information-block-part">
          <article className="info-part-block info-part-block-third">
            <h3 className="info-part-block-header">Never forget</h3>
            <div className="info-part-block-list">
              <ul>
                <li>Orginize your work</li>
                <li>App save your data</li>
                <li>Make your live easier</li>
              </ul>
            </div>
          </article>
          <div className="info-part-block-images-third"></div>
        </div>
      </div>
      <article className="welcome-page_team">
        <h3 className="welcome-page_team-header">{t('welcomeRoute.team')}</h3>
      </article>
      <article className="welcome-page_course">
        <div className="course-text">
          <div className="course-text-member">
            <div className="course-text-member-name">Olga</div>
            <div className="course-text-member-image image-olga"></div>
            <div className="course-text-member-info">
              <div>-Boards</div>
              <div>-Columns</div>
              <div>-Tasks</div>
            </div>
          </div>
          <div className="course-text-member">
            <div className="course-text-member-name">Artur</div>
            <div className="course-text-member-image image-artur"></div>
            <div className="course-text-member-info">
              <div>-Welcome page</div>
              <div>-DnD</div>
              <div>-Styles</div>
            </div>
          </div>
          <div className="course-text-member">
            <div className="course-text-member-name">Alex</div>
            <div className="course-text-member-image image-alex"></div>
            <div className="course-text-member-info">
              <div>-Authorization</div>
              <div>-API</div>
              <div>-Styles</div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
export default WelcomeRoute;
