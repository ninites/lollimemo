const userCtrl = require("../controllers/users");
const express = require("express");
const authToken = require("../middlewares/authToken");
const checkFields = require("../middlewares/checkFields");
const alreadyExist = require("../middlewares/alreadyExist");
const users = express.Router();

users.post("/", checkFields, alreadyExist, userCtrl.postOne);
users.post("/password", checkFields, authToken, userCtrl.changePass);
users.post("/retrieve", checkFields, userCtrl.retrievePassword);
users.post("/login", checkFields, userCtrl.login);
users.get("/info", authToken, userCtrl.getInfo);
users.get("/auth", authToken, userCtrl.auth);
users.get("/", userCtrl.getOne);
users.put("/", checkFields, authToken, userCtrl.putInfo);

module.exports = users;
