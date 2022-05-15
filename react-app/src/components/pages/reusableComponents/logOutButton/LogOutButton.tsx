import React from 'react';
import './LogOutButton.css';

type LogOutButtonProps = {
  logoutApp: React.Dispatch<boolean>;
};

const LogOutButton = ({ logoutApp }: LogOutButtonProps) => {
  const setLogoutApp = () => {
    logoutApp(true);
  };
  return (
    <div className="logout-button_wrapper">
      <button className="button-logout" type="button" onClick={setLogoutApp}></button>
    </div>
  );
};

export default LogOutButton;
