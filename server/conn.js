import express from 'express';
const app = express();

import pkg from 'pg';
const { Pool } = pkg;

import bodyParser from 'body-parser';
import cors from 'cors';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432, // default PostgreSQL port is 5432
  });

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200,
};

app.listen(3000, () => {
    console.log('listening on port 3000');
});
pool.connect();
app.use(bodyParser.json());
app.use(cors(corsOptions));

//api
app.get('/api/films', async (req, res) => {
    try {
      const result = await pool.query(`SELECT * FROM users`)
      res.send(result.rows);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Success' });
});


app.post('/api/addUser', async (req, res) => {
  const { name, password, description } = req.body;
  try {
      // Insert the data into the database
      const query = 'INSERT INTO users (name, password, description) VALUES ($1, $2, $3) RETURNING *';
      const values = [name, password, description];
      const result = await pool.query(query, values);
  
      // Respond with the inserted data to the client (optional)
      res.json(result.rows[0]);
  } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
  });
  
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
