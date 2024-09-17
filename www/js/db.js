// createUser function inserts a new user into the users table and returns the ID of the newly created user.
// getUsers function retrieves all users from the users table.
// updateUser function updates the name and email of a user with the specified ID.
// deleteUser function deletes a user with the specified ID.
//npm install @capacitor/sqlite
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteDBInstance } from '@capacitor-community/sqlite';

const sqlite = Capacitor.isNativePlatform() ? CapacitorSQLite : SQLiteDBInstance;
let db = SQLiteDBConnection;

const createDB = async () => {
  db = await sqlite.createConnection('mydb', false, 'no-encryption', 1);
  await db.open();
  await db.execute(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`);
};

createDB();

// Create
const createUser = async (name = 'string', email = 'string') => {
  const data = [name, email];
  const res = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', data);
  return res.lastId;
};

// Read
const getUsers = async () => {
  const res = await db.query('SELECT * FROM users');
  return res.values;
};

// Update
const updateUser = async (id = 'number', name = 'string', email = 'string') => {
  const data = [name, email, id];
  const res = await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', data);
  return res.changes.changes;
};

// Delete
const deleteUser = async (id = 'number') => {
  const res = await db.run('DELETE FROM users WHERE id = ?', [id]);
  return res.changes.changes;
};
