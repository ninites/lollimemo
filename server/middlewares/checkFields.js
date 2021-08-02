const ApiError = require("../error/ApiError");

const checkFields = async (req, res, next) => {
  const missingFields = {};
  for (const key in req.body) {
    if (!req.body[key]) {
      missingFields[key] = "Merci de remplir " + [key];
    }
  }
  console.log(missingFields);
  if (Object.keys(missingFields).length > 0) {
    next(ApiError.missFile(missingFields));
    return;
  }
  console.log("go next !! ");
  next();
};

module.exports = checkFields;
