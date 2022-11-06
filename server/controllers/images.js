const themesModel = require('../models/themes')
const imagesModel = require('../models/images')
const fs = require('fs')
const ApiError = require('../error/ApiError')
const serpImages = require("../services/serp-images").SerpImagesSingleton

class Images {

  static sendOne = (req, res) => {
    const { rep, img } = req.params;
    res.sendFile(`uploads/${rep}/${img}`, { root: "./" });
  };

  static deleteImg = async (req, res, next) => {
    const { themeId, imageId } = req.params
    const themeToEdit = await themesModel.getOne(themeId)
    if (themeToEdit.images.length <= 11) {
      next(ApiError.badRequest('Vous ne pouvez pas avoir moins de 10 cartes'))
      return
    }
    const imageToDelete = await imagesModel.getOne(imageId)
    if (fs.existsSync(imageToDelete.path)) {
      fs.unlinkSync(imageToDelete.path)
    }
    const deleted = await imagesModel.deleteOne(themeId, imageId)
    res.status(200).json(deleted)
  }

  static search = async (req, res) => {
    try {
      const { textSearch } = req.query
      const params = {
        q: textSearch,
        tbm: "isch",
        ijn: "0",
        num: 20,
        engine: "google"
      };
      const result = await serpImages.search(params)
      res.status(200).json(result)

    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = Images;
