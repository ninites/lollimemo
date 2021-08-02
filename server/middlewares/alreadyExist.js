const ApiError = require("../error/ApiError");
const { User, Theme } = require("../models/schema/schema");

const alreadyExist = async (req, res, next) => {
  switch (req.baseUrl) {
    case "/users":
      checkUser(req, res, next);
      break;
    case "/themes":
      checkTheme(req, res, next);
      break;
    default:
      break;
  }
};

const checkUser = async (req, res, next) => {
  const allUser = await User.find();
  console.log(allUser);
  const alreadyExists = allUser.map((user) => {
    const sameUsername = req.body.username === user.username;
    const sameEmail = req.body.email === user.email;
    return sameEmail || (sameUsername && true);
  });
  console.log(alreadyExists);
  if (alreadyExists.includes(true)) {
    next(ApiError.conflict("Ce nom d'utilisateur ou ce mail existe déja"));
    return;
  }
  next();
};

const checkTheme = async (req, res, next) => {
  const { id } = req.body.userInfo;
  const selectedUser = await User.findOne({ _id: id }).populate("themes");
  const alreadyExists = selectedUser.themes.map((theme) => {
    return theme.name === req.body.name && true;
  });

  if (alreadyExists.includes(true)) {
    next(ApiError.conflict("Vous avez déja un theme avec ce nom"));
    return;
  }
  next();
};

module.exports = alreadyExist;
