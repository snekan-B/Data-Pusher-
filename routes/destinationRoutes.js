const express = require("express");
const router = express.Router();
const destination = require("../models/destination");

router.post("/:accountId", (req, res) => {
  const { accountId } = req.params;
  const { url, method, headers } = req.body;
  if (!url || !method || !headers)
    return res.status(400).json({ error: "Missing required fields" });

  destination.createDestination(
    accountId,
    { url, method, headers },
    (err, result) => {
      if (err) return res.status(500).json({ error: "Creation failed" });
      res.json(result);
    }
  );
});

router.get("/:accountId", (req, res) => {
  destination.getDestinationsByAccountId(req.params.accountId, (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch" });
    res.json(rows);
  });
});

module.exports = router;
