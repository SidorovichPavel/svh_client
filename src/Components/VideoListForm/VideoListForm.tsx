import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VideoListForm.css';

interface IVideoListForm {
  onPlayButtonClick: (id: string, title: string, description: string) => void;
}

interface Video {
  id: string;
  title: string;
  description: string;
}


const VideoListForm: React.FC<IVideoListForm> = ({ onPlayButtonClick }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    axios.get<Video[]>('http://localhost:8090/api/videos')
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке видео:', error);
      });
  }, []);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handlePlayButtonClick = () => {
    if (selectedVideo) {
      onPlayButtonClick(selectedVideo.id, selectedVideo.title, selectedVideo.description);
    } else {
      alert('Пожалуйста, выберите видео для воспроизведения.');
    }
  };

  return (
    <div className="video-list-form">
      <h2>Список видео</h2>
      <div className="video-list">
        {videos.map(video => (
          <div
            key={video.id}
            className={`video-item ${selectedVideo?.id === video.id ? 'selected' : ''}`}
            onClick={() => handleVideoClick(video)}
          >
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
      <button className="play-button" onClick={handlePlayButtonClick}>
        Запустить плеер
      </button>
    </div>
  );
};

export default VideoListForm;