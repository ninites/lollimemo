const userCtrl = require("../controllers/users");
const express = require("express");
const authToken = require("../middlewares/authToken");
const checkFields = require("../middlewares/checkFields");
const alreadyExist = require("../middlewares/alreadyExist");
const users = express.Router();

users.post("/", checkFields, alreadyExist, userCtrl.postOne);
users.post("/login", checkFields, userCtrl.login);
users.get("/info", authToken, userCtrl.getInfo);
users.get("/auth", authToken, userCtrl.auth);
users.get("/", userCtrl.getOne);

module.exports = users;
