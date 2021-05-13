const themesModel = require("../models/themes");
const userModel = require("../models/users");

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
    const deleteTheme = await themesModel.deleteOne(req.params,id);
    res.status(200).json(deleteTheme);
  };
}

module.exports = Themes;
