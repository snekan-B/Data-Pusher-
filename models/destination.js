const db = require("../db");
const { v4: uuidv4 } = require("uuid");

exports.createDestination = (accountId, data, callback) => {
  const id = uuidv4();
  db.run(
    `INSERT INTO destinations (id, accountId, url, method, headers) VALUES (?, ?, ?, ?, ?)`,
    [id, accountId, data.url, data.method, JSON.stringify(data.headers)],
    function (err) {
      callback(err, { id, ...data });
    }
  );
};

exports.getDestinationsByAccountId = (accountId, callback) => {
  db.all(
    `SELECT * FROM destinations WHERE accountId = ?`,
    [accountId],
    callback
  );
};
