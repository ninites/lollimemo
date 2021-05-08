const ApiError = require("../error/ApiError");

const duplicateInArray = async (req, res, next) => {
  const { pictures } = req.files;
  let dupli = [];
  dupli = pictures.map((picture, index, array) => {
    let duplicate = 0;
    array.forEach((pic) => {
      if (pic.originalname === picture.originalname) {
        duplicate++;
      }
    });
    if (duplicate > 1) {
      return "doublon";
    } else {
      return;
    }
  });
  if (dupli.includes("doublon")) {
    next(ApiError.internal("Vous avez un doublon"));
    return;
  }
  next();
};

module.exports = duplicateInArray;
