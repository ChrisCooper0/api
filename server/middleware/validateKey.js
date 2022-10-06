const validateKey = (req, res, next) => {
  let apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    res.status(403).send({ data: "Forbidden: Please provide an API Key" });
  } else {
    next();
  }
};

module.exports = validateKey;
