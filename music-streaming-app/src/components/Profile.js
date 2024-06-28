import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/change-password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Password changed successfully');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setMessage('Failed to change password');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.reload();
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setMessage(response.data.message);
      setUser({ ...user, avatar: response.data.avatarUrl });
    } catch (err) {
      setMessage('Failed to upload avatar');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!user) {
    return <div className="container">User not found</div>;
  }

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.avatar ? (
        <img src={user.avatar} alt="Avatar" />
      ) : (
        <p>No avatar uploaded</p>
      )}
      <form onSubmit={handleAvatarUpload}>
        <h3>Upload Avatar</h3>
        <input type="file" onChange={handleAvatarChange} required />
        <button type="submit" className="button">Upload</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleChangePassword}>
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Change Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Profile;
