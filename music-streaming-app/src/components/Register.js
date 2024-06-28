import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', { username, password, email });
      alert('Registration successful, please check your email for verification.');
      navigate('/login');
    } catch (err) {
      setError(err.response.data.message || 'Registration failed');
      console.error(err);
    }
  };


const handleEmailVerificationSuccess = async () => {
  try {

    await axios.post('http://localhost:5000/afterEmailVerification', { username, password });

  } catch (err) {
 
    console.error(err);
  }
};


  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="button">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
