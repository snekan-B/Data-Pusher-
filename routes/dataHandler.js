const express = require("express");
const router = express.Router();
const axios = require("axios");
const accountModel = require("../models/account");
const destinationModel = require("../models/destination");

router.post("/server/incoming_data", async (req, res) => {
  const token = req.headers["cl-x-token"];
  if (!token) return res.status(401).json({ message: "Un Authenticate" });

  accountModel.getAccountBySecret(token, (err, account) => {
    if (err || !account)
      return res.status(401).json({ message: "Un Authenticate" });

    const data = req.body;
    if (!data || typeof data !== "object") {
      return res.status(400).json({ message: "Invalid Data" });
    }

    destinationModel.getDestinationsByAccountId(
      account.id,
      async (err, destinations) => {
        if (err || destinations.length === 0)
          return res.status(500).json({ message: "No destinations" });

        for (const dest of destinations) {
          try {
            const headers = JSON.parse(dest.headers);
            const config = {
              method: dest.method.toLowerCase(),
              url: dest.url,
              headers,
            };

            if (dest.method.toLowerCase() === "get") {
              config.params = data;
            } else {
              config.data = data;
            }

            await axios(config);
          } catch (e) {
            console.error(`Failed to send to ${dest.url}`, e.message);
          }
        }

        res.json({ message: "Data dispatched successfully" });
      }
    );
  });
});

module.exports = router;
