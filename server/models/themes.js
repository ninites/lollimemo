const { Theme, User, Image } = require("./schema/schema");
const fs = require("fs");

class Themes {
  static postOne = async (info) => {
    const userId = info.userInfo.id;

    const newCardBack = await Image.create({
      path: info.cardBack[0].path,
      type: "cardBack",
    });

    const newPictures = await this.postPics(info.pictures)

    const fullSet = [newCardBack, ...newPictures];

    const newTheme = await Theme.create({ name: info.name });

    await Theme.findOneAndUpdate(
      { _id: newTheme._id },
      { $push: { images: { $each: fullSet } } },
      { new: true, useFindAndModify: false }
    );

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { themes: newTheme } },
      { new: true, useFindAndModify: false }
    );

    return newTheme;
  };


  static getOne = async (id) => {
    return await Theme.findById(id).populate({ path: "images", model: "Image" })
  }

  static deleteOne = async (filter, userId) => {
    const { id } = filter;

    await User.updateOne(
      { _id: userId },
      { $pull: { themes: id } },
      { new: true, useFindAndModify: false }
    );
    const themeToDelete = await Theme.findById(id);
    const imagesToErase = await Image.find({
      _id: { $in: themeToDelete.images },
    });
    const unSyncImg = imagesToErase.forEach(async (image) => {
      if (fs.existsSync(image.path)) {
        fs.unlink(image.path, (err) => err);
      } else {
        console.error("Picture doesn't exists");
      }
    });
    await Image.deleteMany({
      _id: {
        $in: themeToDelete.images,
      },
    });

    const themeRemoved = await themeToDelete.deleteOne();
    return themeRemoved;
  };

  static postPics = async (pictures) => {
    const newPictures = await Promise.all(
      pictures.map(async (picture) => {
        return await Image.create({ type: "themePic", path: picture.path });
      })
    );
    return newPictures
  }

  static editOne = async (themeId, pictures) => {
    const picturesPosted = await this.postPics(pictures)
    const updateTheme = Theme.updateOne(
      { _id: themeId },
      { $push: { images: { $each: picturesPosted } } },
      { new: true, useFindAndModify: false }
    )
    return updateTheme
  }

}

module.exports = Themes;
