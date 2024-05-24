import React, { useEffect, useRef } from 'react';
import dashjs from 'dashjs';
import './Player.css';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoRef.current, url, true);
    }
  }, [url]);

  return (
    <div className="video-container">
      <video ref={videoRef} controls className="video-element" />
    </div>
  );
};

export default VideoPlayer;
