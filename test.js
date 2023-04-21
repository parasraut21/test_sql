require('dotenv').config();

const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ', err);
      return;
    }
  
    console.log('Database connected!');
  });

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM names';
  connection.query(sql, (error, results, fields) => {
    if (error) {
      return res.status(500).send(error);
    }else{
    console.log("connected")
    }
    res.send(results);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});