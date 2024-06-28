DATABASE MYSQL: 


CREATE DATABASE music_db;
USE music_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  verificationToken VARCHAR(255),
  verificationTokenExpires BIGINT,
  isVerified BOOLEAN DEFAULT FALSE
);
USE music_db;
ALTER TABLE users ADD COLUMN avatar VARCHAR(255);
ALTER TABLE users 
ADD COLUMN verificationToken VARCHAR(255),
ADD COLUMN verificationTokenExpires BIGINT,
ADD COLUMN isVerified BOOLEAN DEFAULT false;


CREATE TABLE tracks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  artist VARCHAR(50),
  url VARCHAR(255),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);






Terminal of backend :
- npm i
- npm i ... (các thư viện khác nếu terminal báo lỗi sau khi chạy node server.js)
- node server.js

Terminal of frontend (music-streaming..) :
- npm start 
- npm i ... (các thư viện khác nếu terminal báo lỗi sau khi chạy npm start)
