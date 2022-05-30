import { type } from 'os';
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

  const header = document.getElementById('myHeader') as HTMLElement;

  function myFunction() {
    if (window.pageYOffset > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

  useEffect(() => {
    if (header) {
      window.onscroll = function () {
        myFunction();
      };
    }
  });

  return (
    <section className="main-page">
      <Header />
      <article className="main-wrapper">
        <BoardList />
      </article>
    </section>
  );
};
export default MainRoute;
