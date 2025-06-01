const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("data-pusher.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS accounts (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    secret TEXT NOT NULL,
    website TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS destinations (
    id TEXT PRIMARY KEY,
    accountId TEXT,
    url TEXT NOT NULL,
    method TEXT NOT NULL,
    headers TEXT NOT NULL,
    FOREIGN KEY(accountId) REFERENCES accounts(id) ON DELETE CASCADE
  )`);
});

module.exports = db;
