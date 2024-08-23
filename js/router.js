// It adds a new API endpoint (/api/records/:id) using app.put() to update a record in the database. 
// The id parameter is used to identify the record to be updated. 
// The request body should contain the updated values for column1, column2, and column3.

// It adds another API endpoint (/api/records/:id) using app.delete() to delete a record from the database. 
// The id parameter is used to identify the record to be deleted.

// You can use these new endpoints in your Capacitor app to update and delete records. 
// For example, to update a record with id 1:

// The main difference from the previous code is the addition of the path module and the use of path.join(__dirname, 'capacitor.db') 
// to specify the path to the SQLite database file (capacitor.db) within the Capacitor app's directory.

// Here's how you can use this API in your Capacitor app:
// Make sure you have the SQLite database file (capacitor.db) in your Capacitor app's directory.
// Install the required packages by running npm install express sqlite3 in your Capacitor app's directory.
// Create a new file (e.g., api.js) and copy the modified code into it.
// In your Capacitor app's code (e.g., in a React component), you can make HTTP requests to the API endpoints using the fetch API or a library like axios. 

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = 3000;

// Open a connection to the SQLite database
const dbPath = path.join(__dirname, 'capacitor.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to the database.');
});

// Middleware to parse JSON request bodies
app.use(express.json());

// API endpoint to get all records from a table
app.get('/api/records', (req, res) => {
  const query = 'SELECT * FROM table_name';
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// API endpoint to create a new record
app.post('/api/records', (req, res) => {
  const { column1, column2, column3 } = req.body;
  const query = 'INSERT INTO table_name (column1, column2, column3) VALUES (?, ?, ?)';
  db.run(query, [column1, column2, column3], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Record created successfully' });
  });
});

// API endpoint to update a record
app.put('/api/records/:id', (req, res) => {
  const id = req.params.id;
  const { column1, column2, column3 } = req.body;
  const query = 'UPDATE table_name SET column1 = ?, column2 = ?, column3 = ? WHERE id = ?';
  db.run(query, [column1, column2, column3, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Record updated successfully' });
  });
});

// API endpoint to delete a record
app.delete('/api/records/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM table_name WHERE id = ?';
  db.run(query, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Record deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Fetch records from the API
// fetch('http://localhost:3000/api/records')
//   .then(response => response.json())
//   .then(data => setRecords(data))
//   .catch(error => console.error('Error fetching records:', error));

//For example, to update a record with id 1:
//   fetch('http://localhost:3000/api/records/1', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     column1: 'New Value 1',
//     column2: 'New Value 2',
//     column3: 'New Value 3'
//   })
// })
//   .then(response => response.json())
//   .then(data => console.log(data.message))
//   .catch(error => console.error('Error updating record:', error));

// to delete a record with id 2:
// fetch('http://localhost:3000/api/records/2', {
//   method: 'DELETE'
// })
//   .then(response => response.json())
//   .then(data => console.log(data.message))
//   .catch(error => console.error('Error deleting record:', error));
