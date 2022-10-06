// Temporary in memory db
const apiKeyDb = ["12345"];

const validateKey = (req, res, next) => {
  // https://github.com/prof3ssorSt3v3/how-to-api/blob/master/server/middleware/apikeys.js

  let apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    res.status(403).send({ data: "Please provide an API Key" });
  } else if (!apiKeyDb.includes(apiKey)) {
    res.status(401).send({ data: "Invalid API Key" });
  } else {
    next();
  }
};

module.exports = validateKey;
