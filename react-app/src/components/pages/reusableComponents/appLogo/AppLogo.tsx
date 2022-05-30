import React from 'react';
import { useNavigate } from 'react-router';
import './AppLogo.css';

type LogOutButtonProps = {
  logoutApp: React.Dispatch<boolean>;
};

const AppLogo: React.FC = () => {
  const navigate = useNavigate();
  return <div className="app-logo" onClick={() => navigate('/')}></div>;
};

export default AppLogo;
