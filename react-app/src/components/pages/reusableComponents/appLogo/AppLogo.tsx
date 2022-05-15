import React from 'react';
import './AppLogo.css';

type LogOutButtonProps = {
  logoutApp: React.Dispatch<boolean>;
};

const AppLogo: React.FC = () => {
  return <div className="app-logo"></div>;
};

export default AppLogo;
