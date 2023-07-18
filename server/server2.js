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

app.get('/', function(req, res) {
    console.log("GET request for homepage");
    res.send("This is a GET request and the Homepage");
});

app.post('/post', async(req, res) => {
    console.log("POST request for homepage");
    res.send("This is a POST request that adds to db");

    const user = req.body;
    
    try {
        // const result = await pool.query(`INSERT INTO users(name, password, description)
        //                                VALUES('kerstan', '1234', 'leader')`)
        // const query = 'INSERT INTO users(name, password, description) VALUES($1, $2, $3)';
        // const values = [user.name, user.password, user.description];
        // const result = await pool.query(query, values);
        const result = await pool.query(`INSERT INTO users (name, password, description)
                                        VALUES ('jonlee', '1234', 'leader')`);
        console.log('SUCCESS');
        res.send(result.rows);
    }
    catch (error){
        console.log('failed ', error); //works but passes both try and catch
    }
})

app.delete('/delete', function(req, res) {  
    console.log("DELETE request for homepage");
    res.send("This is a DELETE request");
})

app.get('/film/:id', async(req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE id=${req.params.id}`)
        res.send( result.rows );
    } 
    catch {
        res.send( "error occurred: " );
    }
    pool.end;
});

// API endpoint to get test data
app.get('/api/testdata', (req, res) => {
    const testData = [
      { id: 1, name: 'Test Item 1', value: 42 },
      { id: 2, name: 'Test Item 2', value: 99 },
      // Add more test data here
    ];
    console.log("test data sent");
    res.json(testData);
  });

  app.get('/api/hello', (req, res) => {
    res.json('Hello World!');
  })