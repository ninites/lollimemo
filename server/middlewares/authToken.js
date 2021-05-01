const jwt = require("jsonwebtoken");
const secretJWTKey = "plop";

const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const tokenPresence = token === "null" || token === undefined;
  if (tokenPresence) {
    res.status(401).send(false);
    return;
  }
  jwt.verify(token, secretJWTKey, (err, result) => {
    req.body.userInfo = result;
  });
  next();
};

module.exports = authToken;
