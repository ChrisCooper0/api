import express from "express";
import helmet from "helmet";
import { createConnection } from "mysql2";
import cors from "cors";
import bcrypt from "bcryptjs";
import validateKey from "./middleware/validateKey.js";
import { createNewDBUser } from "./utils/createNewDBUser.js";

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const db = createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "api",
});

// Helmet to enhance security
app.use(helmet());

// Routes
// GET
app.get("/api", validateKey, (_req, res) => {
  return res.status(200).send({ data: "Here is the data" });
});

// POST
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

  // TODO: Add apiUseage: {date, count})
  db.query("SELECT email FROM user WHERE email= ?", [newEmail], (err, row) => {
    if (err) return res.status(400).json(err);
    if (row && row.length) {
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
