const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123Test@',
  database: 'mydb' 
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');

  db.query('CREATE DATABASE IF NOT EXISTS mydb', (err) => {
    if (err) throw new Error(err);
    console.log('Database created ');
    

      createTable();
    });
  });

function createTable() {
  db.query(`
    CREATE TABLE IF NOT EXISTS user (
      id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
      name VARCHAR(100),
      user_id INT(10),
      dept VARCHAR(100)
    )
  `, (err) => {
    if (err) throw new Error(err);
    console.log('Table created');
  }
  )
}
app.post('/api/post', async (req, res) => {
    const { name, user_id, dept } = req.body; 
    console.log(req.body);
    
    if (!name || !user_id || !dept) {
        return res.send('Missing fields: name, user_id, or dept');
    }
  
    const query = `INSERT INTO user (name, user_id, dept) VALUES (?, ?, ?)`;
  
    try {
        const [results] = await db.query.promise()(query, [name, user_id, dept]);
        res.json({
            message: 'User inserted successfully',
            user: { id: results.insertId, name, user_id, dept }
        });
    } catch (err) {
        console.error('Error inserting user: ' + err.stack);
        res.send('Error inserting user');
    }
});


//GET
app.get('/get', async (req, res) => {
    console.log("HI");
    
    try {
        const [results] = await db.promise().query('SELECT * FROM user');
        res.json(results);
    } catch (err) {
        console.error('Error executing query: ' + err.stack);
        res.send('Error fetching user data');
    }
});


//PATCH
app.patch('/patch', async (req, res) => {
    const { name, user_id } = req.body;  
    const query = 'UPDATE user SET name = ? WHERE user_id = ?';
    
    try {
        await db.query.promise()(query, [name, user_id]);
        res.send('User name updated successfully');
    } catch (err) {
        console.log(err);
        res.send('Error updating user');
    }
});

//DELETE

app.delete('/delete', async (req, res) => {
    const { user_id } = req.body;  
    const query = 'DELETE FROM user WHERE user_id = ?';
    
    try {
        await db.promise().query(query, [user_id]);
        res.send('User name deleted successfully');
    } catch (err) {
        console.log(err);
        res.send('Error Removing user');
    }
});


    
app.listen(3005, () => {
  console.log('Server running on port 3005');
});





