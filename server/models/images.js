const { Theme, User, Image } = require("./schema/schema");


class Images {
    static deleteOne = async (themeId, imgId) => {
        const removeImg = await Theme.updateOne(
            { _id: themeId },
            { $pull: { images: imgId } },
            { new: true, useFindAndModify: false }
        )
        return removeImg
    }

    static getOne = async (imgId) => {
        return await Image.findById(imgId)
    }

}

module.exports = Images