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
      console.log(rows);
      //res.json(rows);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });