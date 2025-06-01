const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/accounts", require("./routes/accountRoutes"));
app.use("/destinations", require("./routes/destinationRoutes"));
app.use("/", require("./routes/dataHandler"));

app.listen(port, () => {
  console.log(`Data Pusher app listening at http://localhost:${port}`);
});
