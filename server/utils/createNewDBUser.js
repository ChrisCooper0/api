import { generateApiKey } from "./generateApiKey.js";

export const createNewDBUser = (res, db, newEmail, hashedPassword) => {
  const apiKey = generateApiKey();

  const q = "INSERT INTO user (`email`, `password`, `apiKey`) VALUES (?)";
  const values = [newEmail, hashedPassword, apiKey];

  db.query(q, [values], (err, _data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).send({
      data: `Successfully registered ${newEmail}`,
      apiKey,
    });
  });
};
