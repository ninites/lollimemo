const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  themes: [{ type: Schema.Types.ObjectId, ref: "Theme" }],
  games: [{ type: Schema.Types.ObjectId, ref: "Game" }],
});

const themeSchema = mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: Schema.Types.ObjectId, ref: "Images" }],
});

const imageSchema = mongoose.Schema({
  type: { type: String, required: true },
  path: { type: String, required: true },
});

const gamesSchema = mongoose.Schema({
  type: { type: String, required: true },
  try: { type: Number, required: false },
  userScore: { type: Number, required: false },
  opponent: { type: String, required: false },
  opponentScore: { type: Number, required: false },
  time: { type: String, required: false },
  date: { type: Date, required: true },
  difficulty: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Theme = mongoose.model("Theme", themeSchema);
const Image = mongoose.model("Image", imageSchema);
const Game = mongoose.model("Game", gamesSchema);

module.exports = { User, Theme, Image, Game };
