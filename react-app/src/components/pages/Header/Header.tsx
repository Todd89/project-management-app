import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserStatus } from '../../../react/features/loginSlice';
import { IState } from '../../../interface/types';

const Header: React.FC = () => {
  const userState = useSelector((state: IState) => state.loginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutApp = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  const editProfileApp = () => {
    navigate('/edit');
  };
  return (
    <header className="header">
      <button className="button-edit-profile" type="button" onClick={editProfileApp}>
        Edit profile
      </button>
      <button className="button-add-board" type="button">
        Create board
      </button>
      <div>{userState.name}</div>
      <div className="switcher-wrapper">
        <input
          type="checkbox"
          className="formSwitcher"
          defaultChecked={false}
          id={`formSwitcher`}
        />
        <label className="formSwitcher-label" htmlFor={`formSwitcher`}>
          <span className="formSwitcher-text">Русский/English</span>
        </label>
      </div>
      <button
        className="button-logout"
        type="button"
        onClick={() => {
          dispatch(clearUserStatus('clear'));
          logoutApp();
        }}
      >
        Logout
      </button>
    </header>
  );
};
export default Header;
