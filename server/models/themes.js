const { Theme, User, Image } = require("./schema/schema");
const Images = require("../models/images")

class Themes {
  static postOne = async (info) => {
    const userId = info.userInfo.id;
    const { cardBack, pictures } = info.uploadedPictures
    const newCardBack = await this.postPics(cardBack, "cardBack");
    const newPictures = await this.postPics(pictures, "themePic");
    const fullSet = [...newCardBack, ...newPictures];
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
    return await Theme.findById(id).populate({
      path: "images",
      model: "Image",
    });
  };

  static deleteOne = async (filter, userId) => {
    const { id } = filter;

    await User.updateOne(
      { _id: userId },
      { $pull: { themes: id } },
      { new: true, useFindAndModify: false }
    );

    const themeToDelete = await Theme.findById(id);
    await Images.deleteImagesInThemes(themeToDelete)
    const themeRemoved = await themeToDelete.deleteOne();
    return themeRemoved;
  };

  static postPics = async (pictures, type) => {
    const newPictures = await Promise.all(
      pictures.map(async (picture) => {
        return await Image.create({ type: type, path: picture.url, public_id: picture.public_id });
      })
    );
    return newPictures;
  };

  static editOne = async (themeId, cardBack, pictures) => {
    const allPics = [];
    if (cardBack) {
      const cardBackNew = await this.postPics(cardBack, "cardBack");
      allPics.push(...cardBackNew);
    }
    if (pictures) {
      const picturesPosted = await this.postPics(pictures, "themePic");
      allPics.push(...picturesPosted);
    }
    const updateTheme = Theme.updateOne(
      { _id: themeId },
      { $push: { images: { $each: allPics } } },
      { new: true, useFindAndModify: false }
    );
    return updateTheme;
  };
}

module.exports = Themes;
