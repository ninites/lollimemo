const gameCtrl = require("../controllers/games");
const express = require("express");
const authToken = require("../middlewares/authToken");
const games = express.Router();

games.post("/", authToken, gameCtrl.postOne);
games.get("/", authToken,gameCtrl.getGames);

module.exports = games;
