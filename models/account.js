const db = require("../db");
const { v4: uuidv4 } = require("uuid");

exports.createAccount = (data, callback) => {
  const id = uuidv4();
  const secret = uuidv4();
  db.run(
    `INSERT INTO accounts (id, email, name, secret, website) VALUES (?, ?, ?, ?, ?)`,
    [id, data.email, data.name, secret, data.website || null],
    function (err) {
      callback(err, {
        id,
        email: data.email,
        name: data.name,
        secret,
        website: data.website,
      });
    }
  );
};

exports.getAccountBySecret = (secret, callback) => {
  db.get(`SELECT * FROM accounts WHERE secret = ?`, [secret], callback);
};
