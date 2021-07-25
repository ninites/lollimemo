const jwt = require("jsonwebtoken");
require("dotenv").config();
const ApiError = require("../error/ApiError");

const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const tokenPresence = token === "null" || token === undefined;
  if (tokenPresence) {
    next(ApiError.unAuth());
    return;
  }
  try {
    const secretJWTKey = process.env.JWT.toString()
    const tokenVerif = await jwt.verify(token, secretJWTKey, (err, result) => {
      if (err) {
        throw new Error(err);
      }
      return result;
    });
    req.body.userInfo = tokenVerif;
    next();
  } catch (err) {
    next(ApiError.unAuth("invalid signature"));
  }
};

module.exports = authToken;
