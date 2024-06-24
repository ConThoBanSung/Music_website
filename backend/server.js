const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hoangkha05@',
  database: 'music_db',
  port: 3306
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

const jwtSecret = crypto.randomBytes(32).toString('hex');

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).send('Forbidden');
    req.user = user;
    next();
  });
};

// Routes
app.use('/search', require('./routes/search'));
app.use('/audio', require('./routes/audio'));

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).send('Server error');
    res.status(201).send('User registered');
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.query(sql, [username], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(400).send('User not found');

    const user = results[0];
    if (!bcrypt.compareSync(password, user.password)) return res.status(400).send('Invalid password');

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  });
});

app.get('/profile', authenticateToken, (req, res) => {
  const sql = 'SELECT id, username, email FROM users WHERE id = ?';
  db.query(sql, [req.user.userId], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('User not found');
    res.json(results[0]);
  });
});

app.post('/change-password', authenticateToken, (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const sql = 'SELECT password FROM users WHERE id = ?';
  db.query(sql, [req.user.userId], (err, results) => {
    if (err) return res.status(500).send('Server error');
    if (results.length === 0) return res.status(404).send('User not found');

    const user = results[0];
    if (!bcrypt.compareSync(oldPassword, user.password)) return res.status(400).send('Old password is incorrect');

    const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
    const updateSql = 'UPDATE users SET password = ? WHERE id = ?';
    db.query(updateSql, [hashedNewPassword, req.user.userId], (err, result) => {
      if (err) return res.status(500).send('Server error');
      res.send('Password changed successfully');
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
