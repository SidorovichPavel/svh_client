import React from 'react';
import './Watch.css';

import Header from './Components/Header/Header';
import VideoPlayer from './Components/Player/Player';

const Watch: React.FC = () => {
  return (
    <div className="Watch">
      <Header page_title='Просмотр' />
      <main className="Main-content">
        <div className="Video-player">
          {<VideoPlayer url='https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd'/>}
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