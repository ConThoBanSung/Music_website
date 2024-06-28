import React from 'react';
import { useMusicPlayer } from './MusicPlayerContext';
import './PersistentAudioPlayer.css'; // Ensure you have styles for this

const PersistentAudioPlayer = () => {
  const { currentTrack } = useMusicPlayer();

  if (!currentTrack) {
    return null; // Don't render anything if no track is playing
  }

  return (
    <div className="persistent-audio-player">
      <div className="track-info">
        <img src={currentTrack.thumbnail} alt={currentTrack.title} />
        <div>
          <h4>{currentTrack.title}</h4>
        </div>
      </div>
      <audio controls src={currentTrack.url}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default PersistentAudioPlayer;
