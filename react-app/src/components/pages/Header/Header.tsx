import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserStatus } from '../../../react/features/loginSlice';

import LogOutButton from '../reusableComponents/logOutButton/LogOutButton';
import AppLogo from '../reusableComponents/appLogo/AppLogo';
import { IState } from '../../../interface/types';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const userState = useSelector((state: IState) => state.loginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [language, setLanguage] = useState('Русский');

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  function changeCheckbox() {
    setChecked(!checked);
  }

  useEffect(() => {
    if (checked) {
      changeLanguage('en');
      setLanguage('English');
    } else {
      changeLanguage('ru');
      setLanguage('Русский');
    }
  }, [checked]);

  const logoutApp = () => {
    localStorage.removeItem('token');
    dispatch(clearUserStatus('clear'));
    navigate('/');
  };

  const editProfileApp = () => {
    navigate('/edit');
  };
  return (
    <header className="header">
      <AppLogo />
      <button onClick={editProfileApp} className="button-edit-profile" type="button">
        Edit profile
      </button>
      <button className="button-add-board" type="button">
        Create board
      </button>
      <div>{userState.name}</div>
      <div>{t('title')}</div>
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
