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

app.get('/api/test', (req, res) => {
  res.status(200).send("WORKING")
})

app.use("/api/users", users);
app.use("/api/themes", themes);
app.use("/api/images", images);
app.use('/api/games', games)
app.use(apiErrorHandler);

app.listen(port, () => {
  console.log("LOLLIMEMO ON PORT = " + port);
});

mongoose.connect(url, client);
