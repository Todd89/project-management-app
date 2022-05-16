import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkToken } from '../../../service/servise';
import BoardList from '../../boards/BoardList/BoardList';
import Header from '../Header/Header';
import './MainRoute.css';

const MainRoute: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    checkToken(dispatch, navigate);
  }, []);
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
