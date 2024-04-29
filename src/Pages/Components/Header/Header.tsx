import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

interface IHeader {
}

const Header: React.FC<IHeader> = ({ }) => {

  const token = localStorage.getItem("token");

  return (
    <header className="Header">
      <div className="Header-brand">
        <h1>Simple Video Hosting</h1>
      </div>
      <div className="Header-actions">
        {token ?
          <div>

          </div>
          :
          <div>
            <Link to="/login" className="btn btn-primary Header-button">Войти</Link>
            <Link to="/register" className="Header-button">Зарегистрироваться</Link>
          </div>}
      </div>
    </header>
  );
};

export default Header;