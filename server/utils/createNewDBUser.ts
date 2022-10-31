import { Response } from "express-serve-static-core";
import { Connection } from "mysql2";
import { generateApiKey } from "./generateApiKey";

export const createNewDBUser = (
  res: Response<any, Record<string, any>, number>,
  db: Connection,
  newEmail: any,
  hashedPassword: string
) => {
  const apiKey = generateApiKey();

  const q = "INSERT INTO user (`email`, `password`, `apiKey`) VALUES (?)";
  const values = [newEmail, hashedPassword, apiKey];

  db.query(q, [values], (err: any, _data: any) => {
    if (err) return res.status(400).json(err);
    return res.status(200).send({
      data: `Successfully registered ${newEmail}`,
      apiKey,
    });
  });
};
