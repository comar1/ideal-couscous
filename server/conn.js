import pkg from 'pg'; //why does it work like this
const { Pool } = pkg;
import express from 'express';

const app = express();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dvdrental',
  password: 'password',
  port: 5432, // default PostgreSQL port is 5432
});

app.get('/api/films', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM film');
      res.send(rows);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Success' });
});


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});