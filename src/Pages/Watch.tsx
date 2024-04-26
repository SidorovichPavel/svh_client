import React from 'react';
import './Watch.css';

import Header from './Components/Header/Header';

const Watch: React.FC = () => {
  return (
    <div className="Watch">
      <Header/>
      <main className="Main-content">
        <div className="Video-player">
          <h2>Видеоплеер</h2>
          {/* Здесь можете разместить ваш видеоплеер */}
        </div>
        <div className="Comments-list">
          <h2>Список комментариев</h2>
          {/* Здесь можете разместить список комментариев */}
        </div>
        <div className="Users-list">
          <h2>Список пользователей</h2>
          {/* Здесь можете разместить список пользователей */}
        </div>
      </main>
    </div>
  );
};

export default Watch;