import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

interface ILink {
  id: string;
  path: string;
}

interface IHeader {
  page_title: string;
  actions: ILink[];
}

const guest_header_context = new Map<string, React.JSX.Element>();
guest_header_context.set('Вход', <Link to="/login" className="Header-button">Войти</Link>);
guest_header_context.set('Регистрация', <Link to="/register" className="Header-button">Зарегистрироваться</Link>);

const Header: React.FC<IHeader> = ({ page_title, actions: content }) => {

  const app_title = "Simple Video Hosting";
  const token = localStorage.getItem("token");

  return (
    <header className="Header">
      <div className="Header-brand">
        <h1>{app_title}</h1>
      </div>
      <div>
        <h1>{page_title}</h1>
      </div>
      <div className="Header-actions">
        {content.map(e => (
          <Link to={e.path} className="Header-button">{e.id}</Link>
        ))}
      </div>
    </header>
  );
};

export default Header;