const express = require("express");
const router = express.Router();
const account = require("../models/account");

router.post("/", (req, res) => {
  const { email, name, website } = req.body;
  if (!email || !name)
    return res.status(400).json({ error: "Email and name required" });

  account.createAccount({ email, name, website }, (err, result) => {
    if (err) return res.status(500).json({ error: "Account creation failed" });
    res.json(result);
  });
});

module.exports = router;
