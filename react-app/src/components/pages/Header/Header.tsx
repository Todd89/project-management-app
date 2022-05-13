import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserStatus } from '../../../react/features/loginSlice';
import LogOutButton from '../reusableComponents/logOutButton/LogOutButton';
import AppLogo from '../reusableComponents/appLogo/AppLogo';
import { IState } from '../../../interface/types';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((state: IState) => state.loginData);
  const [checked, setChecked] = useState(false);
  const [language, setLanguage] = useState('Русский');
  function changeCheckbox() {
    setChecked(!checked);
  }
  useEffect(() => {
    if (checked) setLanguage('English');
    else setLanguage('Русский');
  }, [checked]);
  const logoutApp = (event: boolean) => {
    if (event) {
      dispatch(clearUserStatus('clear'));
      navigate('/');
    }
  };
  return (
    <header className="header">
      <AppLogo />
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
          defaultChecked={checked}
          onChange={changeCheckbox}
          id={`formSwitcher`}
        />
        <label className="formSwitcher-label" htmlFor={`formSwitcher`}>
          <span className="formSwitcher-text">{language}</span>
        </label>
      </div>
      <div className="current-user">{userState.name}</div>
      <LogOutButton logoutApp={logoutApp} />
    </header>
  );
};
export default Header;
