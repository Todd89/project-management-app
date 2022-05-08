import React from 'react';
import Header from '../Header/Header';
import './MainRoute.css';

const MainRoute: React.FC = () => {
  return (
    <section className="main-page">
      <Header />
      <article className="main-wrapper">All Boards</article>
    </section>
  );
};
export default MainRoute;
