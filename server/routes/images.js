const express = require("express");
const authToken = require("../middlewares/authToken");
const images = express.Router();
const imagesCtrl = require("../controllers/images");

images.get("/:rep/:img", imagesCtrl.sendOne);

module.exports = images;
