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
  const tokenVerif = await jwt.verify(token, secretJWTKey, (err, result) => {
    if (err) return err;
    return result;
  });

  if (!tokenVerif.id) {
    res.status(401).send(false);
    return;
  }

  req.body.userInfo = tokenVerif;

  next();
};

module.exports = authToken;
