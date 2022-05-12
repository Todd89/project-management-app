import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeRoute.css';
import LogInButton from '../reusableComponents/logInButton/LogInButton';
import SignUpButton from '../reusableComponents/signUpButton/SignUpButton';

const WelcomeRoute: React.FC = () => {
  return (
    <section className="welcome-page">
      <Link to="/signup">
        <SignUpButton />
      </Link>
      <Link to="/login">
        <LogInButton />
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
