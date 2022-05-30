import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import './toMainRouteButton.css';

const ToMainRoute: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <button className="button-toMain" type="button" onClick={() => navigate('/main')}>
      {t('welcomeRoute.to-main')}
    </button>
  );
};

export default ToMainRoute;
