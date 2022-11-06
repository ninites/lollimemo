const themesCtrl = require("../controllers/themes");
const express = require("express");
const authToken = require("../middlewares/authToken");
const themes = express.Router();
const upload = require("../config/multer");
const alreadyExist = require("../middlewares/alreadyExist");
const imgUploader = require("../middlewares/imgUploader");

themes.post(
  "/",
  upload.fields([{ name: "pictures" }, { name: "cardBack" }]),
  authToken,
  alreadyExist,
  imgUploader,
  themesCtrl.postOne
);
themes.delete("/:id", authToken, themesCtrl.deleteOne);
themes.get("/all", authToken, themesCtrl.getAllByUser);
themes.put(
  "/:id",
  upload.fields([{ name: "pictures" }, { name: "cardBack" }]),
  authToken,
  imgUploader,
  themesCtrl.editOne
);

module.exports = themes;
