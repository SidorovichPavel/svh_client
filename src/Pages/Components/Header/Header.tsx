import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="Header">
      <div className="Header-brand">
        <h1>Название сервиса</h1>
      </div>
      <div className="Header-actions">
        <Link to="/login" className="btn btn-primary Header-button">Войти</Link>
        <Link to="/register" className="btn btn-primary Header-button">Зарегистрироваться</Link>
      </div>
    </header>
  );
};

export default Header;