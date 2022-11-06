const cloudinaryAdapter = require("../services/cloudinary-adapter").CloudinaryAdapterSingleton

const imgUploader = async (req, res, next) => {
    const pictures = req.files
    const uploadedPictures = {}
    for (const key in pictures) {
        const images = pictures[key]
        uploadedPictures[key] = await cloudinaryAdapter.bulkPost(images)
    }

    req.body.uploadedPictures = uploadedPictures
    next()
}

module.exports = imgUploader