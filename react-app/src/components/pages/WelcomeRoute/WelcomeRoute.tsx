import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomeRoute.css';

const WelcomeRoute: React.FC = () => {
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
