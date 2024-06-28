import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  

  const fetchSongDetails = async (songId) => {
    try {
      const response = await axios.get(`https://api.example.com/songs/${songId}`);
      playTrack(response.data);
    } catch (error) {
      console.error('Error fetching song details:', error);
    }
  };

  return (
    <MusicPlayerContext.Provider value={{ currentTrack, playTrack, fetchSongDetails }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  return useContext(MusicPlayerContext);
};
