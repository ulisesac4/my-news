require("dotenv").config({ override: true });
const express = require("express");

const app = express();
const port = process.env.PORT;

app.use("/apiv1", require("./routes"));

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
