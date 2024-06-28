import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        // Replace with your client ID and secret
        const clientId = 'e2b570129b0842629b774e17aef4f522';
        const clientSecret = '721fc818e29a4198a6ae415f0707802f';

        // Get Spotify access token
        const authResponse = await axios.post('https://accounts.spotify.com/api/token', null, {
          params: {
            grant_type: 'client_credentials'
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
          }
        });

        const accessToken = authResponse.data.access_token;

        // Fetch latest tracks
        const tracksResponse = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=10', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        setTopSongs(tracksResponse.data.albums.items); // Adjust as per Spotify API response structure
      } catch (error) {
        console.error('Error fetching top tracks from Spotify:', error);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <div className="container">
      <h2>Welcome to SecGei Music</h2>
      <p>Explore the best music collection.</p>
      <ul className="nav-links">
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/music-player">Music Player</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/upload">Upload</Link></li>
      </ul>
      <div className="top-songs">
        <h3>Top Songs</h3>
        <div className="songs-list">
          {topSongs.map((song, index) => (
            <div key={index} className="song-item">
              <img src={song.images[0].url} alt={song.name} />
              <div className="song-details">
                <p>{song.name}</p>
                <p>{song.artists.map(artist => artist.name).join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
