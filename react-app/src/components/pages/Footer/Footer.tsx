import React from 'react';
import './Footer.css';
import RSSchoolLogo from '../reusableComponents/RSSchoolLogo/RSSchoolLogo';
import { ReactComponent as GitHub } from './github.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-rsschool">
        <a href="https://rs.school/react/" target="_Blank" rel="noreferrer">
          <RSSchoolLogo />
        </a>
      </div>
      <div className="footer-github">
        <GitHub className="git-hub_svg" />
        <a href="https://github.com/todd89" target="_Blank" rel="noreferrer">
          Aleksandr
        </a>
        <a href="https://github.com/dairin-dei" target="_Blank" rel="noreferrer">
          Olga
        </a>
        <a href="https://github.com/ArturZabashta" target="_Blank" rel="noreferrer">
          Artur
        </a>
        <GitHub className="git-hub_svg" />
      </div>
      <div className="footer-copyright">© 2022</div>
    </footer>
  );
};
export default Footer;
