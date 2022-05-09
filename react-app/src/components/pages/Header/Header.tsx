import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserStatus } from '../../../react/features/loginSlice';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutApp = () => {
    navigate('/');
  };
  return (
    <header className="header">
      <button className="button-edit-profile" type="button">
        Edit profile
      </button>
      <button className="button-add-board" type="button">
        Create board
      </button>
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
