const themesModel = require("../models/themes");

class Themes {
  static postOne = async (req, res) => {
    const pictures = [{path:"plop"},{path:"plipI"}]
    req.body.pictures = pictures
    const newTheme = await themesModel.postOne(req.body);
    res.status(200).json(newTheme);
  };
}

module.exports = Themes;
