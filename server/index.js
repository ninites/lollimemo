const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/memory";
const client = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = client;

const users = require("./routes/users");

app.use(cors("*"));
app.use(express.json());

app.use("/users", users);

app.listen(port, () => {
  console.log("server on port " + port);
});

mongoose.connect(url, client);
