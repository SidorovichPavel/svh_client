import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

interface IHeader {
  page_title: string;
}

const Header: React.FC<IHeader> = ({ page_title }) => {

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
        {token ?
          <div>
            <Link to={"/profile"} className='btn btn-primary Header-button'>Личный кабинет</Link>
          </div>
          :
          <div>
            <Link to="/login" className="btn btn-primary Header-button">Войти</Link>
            <Link to="/register" className="btn btn-primary Header-button">Зарегистрироваться</Link>
          </div>}
      </div>
    </header>
  );
};

export default Header;