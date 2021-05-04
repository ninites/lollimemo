const { Theme, User, Image } = require("./schema/schema");

class Themes {
  static postOne = async (info) => {
    const userId = info.userInfo.id;

    const newCardBack = await Image.create({
      path: info.cardBack[0].path,
      type: "cardBack",
    });

    const newPictures = await Promise.all(
      info.pictures.map(async (picture) => {
        return await Image.create({ type: "themePic", path: picture.path });
      })
    );

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
}

module.exports = Themes;
