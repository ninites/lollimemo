const themesCtrl = require("../controllers/themes");
const express = require("express");
const authToken = require("../middlewares/authToken");
const themes = express.Router();

themes.post("/", authToken, themesCtrl.postOne);

module.exports = themes;
