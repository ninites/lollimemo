const gameCtrl = require("../controllers/games");
const express = require("express");
const authToken = require("../middlewares/authToken");
const games = express.Router();

games.post("/", authToken, gameCtrl.postOne);
games.post("/id/:id", authToken, gameCtrl.postOneByUserId);
games.get("/", authToken, gameCtrl.getGames);

module.exports = games;
