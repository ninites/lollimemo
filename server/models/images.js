const cloudinaryAdapter = require("../services/cloudinary-adapter").CloudinaryAdapterSingleton;
const { Theme, User, Image } = require("./schema/schema");

class Images {
  static deleteOne = async (themeId, imgId) => {
    const image = await this.getOne(imgId)
    await cloudinaryAdapter.delete(image.public_id)
    await Image.deleteOne({ _id: imgId })
    const removeImg = await Theme.updateOne(
      { _id: themeId },
      { $pull: { images: imgId } },
      { new: true, useFindAndModify: false }
    );
    return removeImg;
  };

  static getOne = async (imgId) => {
    return await Image.findById(imgId);
  };

  static deleteImagesInThemes = async (theme) => {
    const imagesToErase = await Image.find({
      _id: { $in: theme.images },
    });

    for (const image of imagesToErase) {
      await cloudinaryAdapter.delete(image.public_id)
    }

    await Image.deleteMany({
      _id: {
        $in: theme.images,
      },
    });
  }

  static getOneByType = async (type, value) => {
    return await Image.find({ [type]: value });
  };
}

module.exports = Images;
