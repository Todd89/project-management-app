import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeRoute.css';
import LogInButton from '../reusableComponents/logInButton/LogInButton';
import SignUpButton from '../reusableComponents/signUpButton/SignUpButton';
import RSSchoolLogo from '../reusableComponents/RSSchoolLogo/RSSchoolLogo';

const WelcomeRoute: React.FC = () => {
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
