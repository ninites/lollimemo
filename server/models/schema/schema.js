const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  themes: [{ type: Schema.Types.ObjectId, ref: "Theme" }],
});

const themeSchema = mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: Schema.Types.ObjectId, ref: "Images" }],
});

const imageSchema = mongoose.Schema({
  type: { type: String, required: true },
  path: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
const Theme = mongoose.model("Theme", themeSchema);
const Image = mongoose.model("Image", imageSchema);

module.exports = { User, Theme, Image };
