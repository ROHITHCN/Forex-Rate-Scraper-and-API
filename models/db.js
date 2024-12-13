require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Promisify the connection for use with async/await
const db = connection.promise();

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = db;
