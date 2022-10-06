const generateApiKey = () => {
  // Base-36 (a-z, 0-9) string that is always 30 chars long
  return [...Array(30)]
    .map(() => ((Math.random() * 36) | 0).toString(36))
    .join("");
};

export default generateApiKey;
