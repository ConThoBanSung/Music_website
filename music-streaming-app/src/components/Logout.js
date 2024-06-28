import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('rememberMe');
    alert('Logged out successfully');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
