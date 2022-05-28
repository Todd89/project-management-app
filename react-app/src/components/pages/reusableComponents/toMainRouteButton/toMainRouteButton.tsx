import React from 'react';
import { useNavigate } from 'react-router';
import './toMainRouteButton.css';

const ToMainRoute: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button className="button-toMain" type="button" onClick={() => navigate('/main')}>
      To Main Page
    </button>
  );
};

export default ToMainRoute;
