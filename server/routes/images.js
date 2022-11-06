const express = require("express");
const authToken = require("../middlewares/authToken");
const images = express.Router();
const imagesCtrl = require("../controllers/images");

images.get("/:rep/:img", imagesCtrl.sendOne);
images.delete('/:themeId/:imageId', authToken, imagesCtrl.deleteImg)
images.get("/search",authToken,imagesCtrl.search)

module.exports = images;
