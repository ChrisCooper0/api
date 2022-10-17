import { createConnection } from "mysql2";

// DB connection
const db = createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "api",
});

const validateKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    res.status(403).send({ data: "Please provide an API Key" });
  } else {
    db.query(
      "SELECT apiKey FROM user WHERE apiKey= ?",
      [apiKey],
      (err, row) => {
        if (err) return res.status(400).json(err);
        if (!row || !row.length) {
          res.status(401).send({
            data: "Invalid API Key",
          });
        } else {
          next();
        }
      }
    );
  }
};

export default validateKey;
