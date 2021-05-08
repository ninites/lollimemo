const ApiError = require("./ApiError");

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  console.error("An error has occurred:", err.message);
  return res.status(500).json({ error: "quelque chose ne va pas" });
};

module.exports = apiErrorHandler;
