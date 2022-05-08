import React from 'react';
import './Footer.css';
import { ReactComponent as RssSchool } from './rss.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-rsschool">
        <a href="https://rs.school/react/" target="_Blank" rel="noreferrer">
          <RssSchool className="rss-school_svg" />
        </a>
      </div>
      <div className="footer-github">
        <a href="https://github.com/todd89" target="_Blank" rel="noreferrer">
          Alexandr
        </a>
        <a href="https://github.com/dairin-dei" target="_Blank" rel="noreferrer">
          Olga
        </a>
        <a href="https://github.com/ArturZabashta" target="_Blank" rel="noreferrer">
          Artur
        </a>
      </div>
      <div className="footer-copyright">© 2022</div>
    </footer>
  );
};
export default Footer;
