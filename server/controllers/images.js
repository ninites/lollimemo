const themesModel = require('../models/themes')
const imagesModel = require('../models/images')
const fs = require('fs')

class Images {
  static sendOne = (req, res) => {
    const { rep, img } = req.params;
    res.sendFile(`uploads/${rep}/${img}`, { root: "./" });
  };

  static deleteImg = async (req, res) => {
    const { themeId, imageId } = req.params
    const imageToDelete = await imagesModel.getOne(imageId)
    if (fs.existsSync(imageToDelete.path)) {
      fs.unlinkSync(imageToDelete.path)
    }
    const deleted = await imagesModel.deleteOne(themeId, imageId)
    res.status(200).json(deleted)
  }


}

module.exports = Images;
