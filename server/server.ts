import express from "express";
import helmet from "helmet";
import cors from "cors";
import bcrypt from "bcryptjs";
import validateKey from "./middleware/validateKey";
import { createNewDBUser } from "./utils/createNewDBUser";
import { generateApiKey } from "./utils/generateApiKey";
import { db } from "./dbConnection";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());

// Helmet to enhance security
app.use(helmet());

// Routes
// GET
app.get("/api", validateKey, (_req, res) => {
  return res.status(200).send({ data: "Success" });
});

// GET user
app.get("/user", validateKey, (_req, res) => {
  return res.status(200).send({ data: "User" });
});

// POST: reset account api key
app.post("/api/resetApiKey", (req, res) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    res.status(403).send({ data: "Please provide an API Key" });
    return;
  }

  const { email } = req.body;

  if (!email) {
    res.status(400).send({ data: "Please provide an email address" });
    return;
  }

  const newApiKey = generateApiKey();

  db.query(
    "UPDATE user SET apiKey= ? WHERE apiKey= ?;",
    [newApiKey, apiKey],
    (err, row) => {
      if (err) return res.status(400).json(err);

      if (!row) return res.status(400).send({ data: "No such apiKey exists" });
      return res.status(200).send({ apiKey: newApiKey });
    }
  );
});

// POST: register new user
app.post("/api/register", async (req, res) => {
  const { email: newEmail, password } = req.body;

  if (!newEmail) {
    res.status(400).send({ data: "Please provide an email address" });
    return;
  }

  if (!password) {
    res.status(400).send({ data: "Please provide a password" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("SELECT email FROM user WHERE email= ?;", [newEmail], (err, row) => {
    const json: any = row;
    if (err) return res.status(400).json(err);
    if (json.length) {
      res.status(400).send({
        data: "A user already exists with this email",
      });
    } else {
      createNewDBUser(res, db, newEmail, hashedPassword);
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});
