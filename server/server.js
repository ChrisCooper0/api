const express = require("express");
const app = express();
require("dotenv").config();
const { json } = require("body-parser");
const helmet = require("helmet");
const mysql = require("mysql2");

// db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "api",
});

// bodyParser to parse application/json
app.use(json());
app.use(express.json());

// adding Helmet to enhance the API's security
app.use(helmet());

// middleware
const validateKey = require("./middleware/validateKey.js");

// utils
const generateApiKey = require("./utils/generateApiKey.js");

// Routes
app.get("/api/demo", validateKey, (_, res) => {
  res.status(200).send({ data: "Hello World" });
});

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  console.log(email, password, "test");

  // TODO: salt/hash password before saving to db
  const hashedPassword = password;

  // TODO: Create User DB (id, email, password, apiKey, apiUseage: {date, count}) and check if user exists
  const newUser = true;

  if (!email) {
    res.status(400).send({ data: "Please provide an email address." });
    return;
  }

  if (!newUser) {
    res.status(400).send({
      data: "User already exists with this email. Please try logging in.",
    });
    return;
  }

  // Generate new apiKey
  const apiKey = generateApiKey();

  // TODO: Create new User in DB
  const q = "INSERT INTO user (`email`, `password`, `apiKey`) VALUES (?)";
  const values = [email, hashedPassword, apiKey];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).send({
      data: `Successfully registered ${email}`,
      apiKey,
    });
  });
});

app.listen(() => {
  console.log(`🚀 Server started ${process.env.PORT}`);
});
