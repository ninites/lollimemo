const themesModel = require("../models/themes");
const userModel = require("../models/users");
const imageModel = require("../models/images");
const ApiError = require("../error/ApiError");
const fs = require("fs");

class Themes {
  static postOne = async (req, res) => {
    const { cardBack, pictures } = req.files;
    req.body.cardBack = cardBack;
    req.body.pictures = pictures;
    const newTheme = await themesModel.postOne(req.body);
    res.status(200).json(newTheme);
  };

  static getAllByUser = async (req, res) => {
    const { id } = req.body.userInfo;
    const actualUser = await userModel.getOne({ id: id });
    res.status(200).json(actualUser.themes);
  };

  static deleteOne = async (req, res) => {
    const { id } = req.body.userInfo;
    const deleteTheme = await themesModel.deleteOne(req.params, id);
    res.status(200).json(deleteTheme);
  };

  static editOne = async (req, res, next) => {
    const { cardBack, pictures } = req.files;

    if (cardBack) {
      const theme = await themesModel.getOne(req.params.id);
      const oldCardBack = theme.images.filter(
        (image) => image.type === "cardBack"
      );
      if (oldCardBack[0] && fs.existsSync(oldCardBack[0].path)) {
        fs.unlinkSync(oldCardBack[0].path);
        await imageModel.deleteOne(req.params.id, oldCardBack[0]._id);
      }
    }

    const editTheme = await themesModel.editOne(
      req.params.id,
      cardBack,
      pictures
    );
    const newTheme = await themesModel.getOne(req.params.id);
    res.status(200).json(newTheme);
  };
}

module.exports = Themes;
