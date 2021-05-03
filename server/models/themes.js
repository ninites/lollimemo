const { Theme, User, Image } = require("./schema/schema");

class Themes {
  static postOne = async (info) => {
    const userId = info.userInfo.id;

    const themeBody = {
      name: info.name,
    };

    const newPictures = await Promise.all(
      info.pictures.map(async (picture) => {
        return await Image.create(picture);
      })
    );

    const newTheme = await Theme.create(themeBody);

    await Theme.findOneAndUpdate(
      { _id: newTheme._id },
      { $push: { images: { $each: newPictures } } },
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
