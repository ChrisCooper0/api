import express from "express";
import validateKey from "../middleware/validateKey";
import bcrypt from "bcryptjs";
import { createNewDBUser } from "../utils/createNewDBUser";
import { generateApiKey } from "../utils/generateApiKey";
import { db } from "../dbConnection";

const router = express.Router();

// GET: data
router.get("/", validateKey, (_req, res) => {
  return res.status(200).send({ data: "Success" });
});

// POST: user
router.post("/user", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      data: `Please provide ${!email ? `an email address` : `a password`}`,
    });
  }

  db.query(
    "SELECT password FROM user WHERE email= ? LIMIT 1;",
    [email],
    (err, row) => {
      const json: any = row;
      if (err) return res.status(400).json(err);
      if (json.length) {
        const validPassword = bcrypt.compareSync(password, json[0].password);
        if (!validPassword) {
          return res.status(400).send({ data: "Incorrect password" });
        } else {
          db.query(
            "SELECT email, apiKey FROM user WHERE email= ? LIMIT 1;",
            [email],
            (err, row) => {
              const json: any = row;
              if (err) return res.status(400).json(err);

              if (json.length) {
                return res.status(200).send({
                  apiKey: json[0].apiKey,
                });
              } else {
                return res.status(400).send({ data: "User does not exist" });
              }
            }
          );
        }
      } else {
        return res.status(400).send({ data: "User does not exist" });
      }
    }
  );
});

// POST: reset account api key
router.post("/resetApiKey", (req, res) => {
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
      return res
        .status(200)
        .send({ data: "New API key generated", apiKey: newApiKey });
    }
  );
});

// POST: register new user
router.post("/register", async (req, res) => {
  const { email: newEmail, password } = req.body;

  if (!newEmail || !password) {
    return res.status(400).send({
      data: `Please provide ${!newEmail ? `an email address` : `a password`}`,
    });
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

// DELETE user
router.delete("/deleteUser", (req, res) => {
  const { email } = req.body;

  db.query("DELETE FROM user WHERE email= ?;", [email], (err, row) => {
    const json: any = row;
    if (err) return res.status(400).json(err);
    if (json.length) {
      res.status(400).send({
        data: "Failed to delete account",
      });
    } else {
      return res.status(200).send({ data: "Account succesfully deleted" });
    }
  });
});

// PUT: update user password
router.put("/resetpassword", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    // Generic error as email fetched from state
    return res.status(400).send({ data: "Error: Please try again" });
  }

  if (!password) {
    return res.status(400).send({ data: "Please provide a new password" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query("SELECT password FROM user WHERE email= ?;", [email], (err, row) => {
    const json: any = row;
    if (err) return res.status(400).json(err);
    if (json.length) {
      const match = bcrypt.compareSync(password, json[0].password);

      if (match) {
        return res.status(400).send({
          data: "Your new password cannot be the same as your existing password",
        });
      } else {
        db.query(
          "UPDATE user SET password= ? WHERE email= ?;",
          [hashedPassword, email],
          (err: any, _data: any) => {
            if (err) return res.status(400).json(err);
            return res.status(200).send({
              data: `Successfully updated password`,
            });
          }
        );
      }
    } else {
      // Generic error as email fetched from state
      return res.status(400).send({ data: "Error: Please try again" });
    }
  });
});

export default router;
