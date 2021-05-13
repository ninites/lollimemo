const ApiError = require("../error/ApiError");
const fs = require('fs')

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
    pictures.forEach(async (image) => {
      if (fs.existsSync(image.path)) {
        fs.unlink(image.path, (err) => err);
      } else {
        console.error("Picture doesn't exists");
      }
    });
    next(ApiError.internal("Vous avez un doublon"));
    return;
  }
  next();
};

module.exports = duplicateInArray;
