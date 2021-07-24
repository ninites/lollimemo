const ApiError = require("../error/ApiError");
const gameModel = require("../models/games");

class Games {
  static postOne = async (req, res, next) => {
    const user = req.body.userInfo.id;
    delete req.body.userInfo;
    const newGameSaved = await gameModel.postOne({
      game: req.body,
      user: user,
    });
    res.status(200).json(newGameSaved);
  };

  static getGames = async (req, res, next) => {
    const { userInfo } = req.body;   
    const soloGames = await gameModel.getGames(userInfo.id, req.query);
    res.status(200).json(soloGames);
  };
}

module.exports = Games;
