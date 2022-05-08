import React from 'react';
import Header from '../Header/Header';
import './BoardRoute.css';

const BoardRoute: React.FC = () => {
  return (
    <section className="board-page">
      <Header />
      <article className="board-wrapper">New Board</article>
    </section>
  );
};
export default BoardRoute;
