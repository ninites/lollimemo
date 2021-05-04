const themesCtrl = require("../controllers/themes");
const express = require("express");
const authToken = require("../middlewares/authToken");
const themes = express.Router();
const upload = require("../config/multer");

themes.post(
  "/",
  upload.fields([{ name: "pictures" }, { name: "cardBack" }]),
  authToken,
  themesCtrl.postOne
);

themes.get("/all", authToken, themesCtrl.getAllByUser);

module.exports = themes;
