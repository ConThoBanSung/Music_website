import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <nav>
        <ul>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/player">Music Player</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/upload">Upload</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
