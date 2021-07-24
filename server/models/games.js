const { Game, User } = require("./schema/schema");

class Games {
  static postOne = async ({ game, user }) => {
    const newSavedGame = await Game.create(game);
    await User.findOneAndUpdate(
      { _id: user },
      { $push: { games: newSavedGame } },
      { new: true, useFindAndModify: false }
    );
    return newSavedGame;
  };

  static getGames = async (userId, filters) => {
    const user = await User.findById(userId).populate({
      path: "games",
      match: filters,
      options: { sort: { date: -1 } },
    });
    console.log(user);
    return user.games;
  };
}

module.exports = Games;
