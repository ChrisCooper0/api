// Express app
const express = require("express");
const app = express();

// Env vars
require("dotenv").config();

// Middleware
const validateKey = require("./middleware/validateKey");

// Route
app.get("/api/demo", validateKey, (_, res) => {
  res.status(200).send({ data: "Hello World" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started ${process.env.PORT}`);
});
