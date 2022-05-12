import React from 'react';
import './LogOutButton.css';

type LogOutButtonProps = {
  logoutApp: React.Dispatch<boolean>;
};

const LogOutButton = ({ logoutApp }: LogOutButtonProps) => {
  const setLogoutApp = () => {
    logoutApp(true);
  };
  return <button className="button-logout" type="button" onClick={setLogoutApp}></button>;
};

export default LogOutButton;
