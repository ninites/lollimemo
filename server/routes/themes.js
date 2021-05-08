const themesCtrl = require("../controllers/themes");
const express = require("express");
const authToken = require("../middlewares/authToken");
const themes = express.Router();
const upload = require("../config/multer");
const duplicateInArray = require("../middlewares/duplicateInArray");

themes.post(
  "/",
  upload.fields([{ name: "pictures" }, { name: "cardBack" }]),
  authToken,
  duplicateInArray,
  themesCtrl.postOne
);

themes.get("/all", authToken, themesCtrl.getAllByUser);

module.exports = themes;
