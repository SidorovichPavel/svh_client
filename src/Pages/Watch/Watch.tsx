import React, { useState } from 'react';
import './Watch.css';

import Header from '../../Components/Header/Header';
import VideoPlayer from '../../Components/Player/Player';
import VideoListForm from '../../Components/VideoListForm/VideoListForm';

interface Video {
  id: string;
  title: string;
  description: string;
}

const Watch: React.FC = () => {

  const [video, setVideo] = useState<Video | null>(null);

  const onPlayButtonClick = (id: string, title: string, description: string) => {
    setVideo({ id, title, description });
  }

  return (
    <div className="Watch">
      <Header page_title='Просмотр' />
      <main className="Main-content">
        <div className="Video-player">
          {video && <VideoPlayer url={`http://localhost:8090/api/playback/${video.id}/manifest.mpd`} />}
          <label>Описание: </label>
          
        </div>
        <div className="Comments-list">
          <h2>Список комментариев</h2>
          {/* Здесь можете разместить список комментариев */}
        </div>
        <div className="Video-list">
          {<VideoListForm onPlayButtonClick={onPlayButtonClick} />}
        </div>
      </main>
    </div>
  );
};

export default Watch;