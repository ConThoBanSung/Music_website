import React from 'react';
import { useMusicPlayer } from '../MusicPlayerContext';
import './MusicPlayer.css'

const MusicPlayer = () => {
  const { currentTrack, pauseTrack, resumeTrack, isPlaying } = useMusicPlayer();

  return (
    <div>
      {currentTrack ? (
        <div>
          <h1>Now Playing: {currentTrack.title}</h1>
          <div className="description">
            <h2>Description:</h2>
            <p>{currentTrack.description}</p>
          </div>
        </div>
      ) : (
        <h1>No track is playing</h1>
      )}
    </div>
  );
};

export default MusicPlayer;
