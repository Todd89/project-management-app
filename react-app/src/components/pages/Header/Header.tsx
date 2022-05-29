import React, { useState, useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserStatus } from '../../../react/features/loginSlice';

import LogOutButton from '../reusableComponents/logOutButton/LogOutButton';
import AppLogo from '../reusableComponents/appLogo/AppLogo';
import { IState } from '../../../interface/types';
import { useTranslation } from 'react-i18next';
import { TStore } from '../../../react/store';
import { DataBoards, setIsModalOn } from '../../../react/features/dataSlice';
import ButtonAdd from '../../boards/ButtonAdd/ButtonAdd';
import { ReactComponent as EditProfile } from './edit-profile.svg';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const userState = useSelector((state: IState) => state.loginData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [language, setLanguage] = useState('English');

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  function changeCheckbox() {
    setChecked(!checked);
  }

  useEffect(() => {
    if (!checked) {
      changeLanguage('en');
      setLanguage('English');
    } else {
      changeLanguage('ru');
      setLanguage('Русский');
    }
    console.log('checked', checked);
  }, [checked]);

  const logoutApp = () => {
    localStorage.removeItem('token');
    dispatch(clearUserStatus('clear'));
    navigate('/');
  };

  function handleBoardAdd() {
    dispatch(dispatch(setIsModalOn(true)));
  }

  const editProfileApp = () => {
    navigate('/edit');
  };

  return (
    <header className="header">
      <div className="header-controls">
        <div className="header-logo">
          <AppLogo />
        </div>
        <button onClick={editProfileApp} className="button-edit-profile" type="button">
          <EditProfile className="edit-profile" />
        </button>
        <ButtonAdd handleAdd={handleBoardAdd} />
      </div>

      <div className="switcher-wrapper">
        <input
          type="checkbox"
          className="formSwitcher"
          defaultChecked={checked}
          onChange={changeCheckbox}
          id={`formSwitcher`}
        />
        <label className="formSwitcher-label" htmlFor={`formSwitcher`}>
          <div className="formSwitcher-text">{language}</div>
        </label>
      </div>
      <div className="user-control">
        <div className="current-user">
          <span>Hello, </span>
          <span className="current-user_name">{'  ' + userState.name}</span>
        </div>
        <LogOutButton logoutApp={logoutApp} />
      </div>
    </header>
  );
};
export default Header;
