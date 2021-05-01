const userCtrl = require("../controllers/users");
const express = require("express");
const authToken = require("../middlewares/authToken");
const users = express.Router();

// users.get("/:id", userCtrl.getOne);
users.post("/", userCtrl.postOne);
users.post("/login", userCtrl.login);
users.get('/auth',authToken,userCtrl.auth)


module.exports = users;
