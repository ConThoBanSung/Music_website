import React, { useState } from 'react';
import axios from 'axios';
import './Search.css'; // Import the CSS file

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [playingUrl, setPlayingUrl] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/search', {
        params: { query }
      });
      setResults(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Welcome to SecGei Music</h1>
      <p>Explore the best music collection.</p>
      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for music"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      <div>
        {results.map(result => (
          <div key={result.id.videoId}>
            <h3>{result.snippet.title}</h3>
            <p>{result.snippet.description}</p>
            <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
            {/* Placeholder for audio source URL */}
            <audio controls>
              <source src={`http://localhost:5000/audio/${result.id.videoId}`} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
