require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");
const url = process.env.MONGO_URL;
const client = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = client;

const users = require("./routes/users");
const themes = require("./routes/themes");
const images = require("./routes/images");
const games = require('./routes/games')
const apiErrorHandler = require("./error/apiErroHandler");

app.use(cors("*"));
app.use(express.json());

app.use("/users", users);
app.use("/themes", themes);
app.use("/uploads", images);
app.use('/games',games)
app.use(apiErrorHandler);

app.listen(port, () => {
  console.log("server on port " + port);
});

mongoose.connect(url, client);
