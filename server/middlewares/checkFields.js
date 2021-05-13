const ApiError = require("../error/ApiError");

const checkFields = async (req, res, next) => {
  const missingFields = {};
  for (const key in req.body) {
    if (!req.body[key]) {
      missingFields[key] = "Merci de remplir " + [key];
    }
  }

  if (Object.keys(missingFields).length > 0) {
    next(ApiError.missFile(missingFields));
    return;
  }
  next();
};

module.exports = checkFields;
