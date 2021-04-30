const userCtrl = require("../controllers/users");
const express = require("express");
const users = express.Router();

users.get("/:id", userCtrl.getOne);
users.post("/", userCtrl.postOne);
users.post("/login", userCtrl.login);


module.exports = users;
