const userCtrl = require("../controllers/users");
const express = require("express");
const authToken = require("../middlewares/authToken");
const users = express.Router();

users.post("/", userCtrl.postOne);
users.post("/login", userCtrl.login);
users.get("/info", authToken, userCtrl.getInfo);
users.get("/auth", authToken, userCtrl.auth);
users.get("/", userCtrl.getOne);

module.exports = users;
