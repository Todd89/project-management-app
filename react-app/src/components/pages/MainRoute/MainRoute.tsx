import React from 'react';
import BoardList from '../../boards/BoardList/BoardList';
import Header from '../Header/Header';
import './MainRoute.css';

const MainRoute: React.FC = () => {
  return (
    <section className="main-page">
      <Header />
      <article className="main-wrapper">
        <h1>All Boards</h1>
        <BoardList />
      </article>
    </section>
  );
};
export default MainRoute;
