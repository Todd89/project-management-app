import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUserStatus } from '../../../react/features/loginSlice';
import LogOutButton from '../reusableComponents/logOutButton/LogOutButton';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutApp = (event: boolean) => {
    if (event) {
      dispatch(clearUserStatus('clear'));
      navigate('/');
    }
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
      <LogOutButton logoutApp={logoutApp} />
    </header>
  );
};
export default Header;
