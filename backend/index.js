require("dotenv").config({ override: true });
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { hydratePending } = require("./services/issues");

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/apiv1", require("./routes"));

app.get("/", (req, res) => {
  res.send("Express Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

hydratePending()
  .then((success) => {
    console.log("Have correctly hydrated unsent issues at server boot");
  })
  .catch((err) => {
    console.error(
      "[Err] Something happened while hydrating pending issues",
      err
    );
  });
