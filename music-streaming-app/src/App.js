import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Search from './components/Search';
import MusicPlayer from './components/MusicPlayer';
import Profile from './components/Profile';
import Upload from './components/Upload';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        {/* Header */}
        <header className="header">
          <h1 className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>SecGei</Link>
          </h1>
          <nav className="nav">
            <ul>
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="auth-link">Profile</Link>
                  <Link to="/" onClick={handleLogout} className="auth-link">Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="auth-link">Login</Link>
                  <Link to="/register" className="auth-link">Register</Link>
                </>
              )}
            </ul>
          </nav>
        </header>

        {/* Main content */}
        <main className="main">
          <section className="content">
            <h2>Welcome to SecGei Music</h2>
            <p>Explore the best music collection.</p>
          </section>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/player/:songId" element={<MusicPlayer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} SecGei. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
