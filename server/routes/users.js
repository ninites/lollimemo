const userCtrl = require("../controllers/users");
const express = require("express");
const authToken = require("../middlewares/authToken");
const checkFields = require("../middlewares/checkFields");
const alreadyExist = require("../middlewares/alreadyExist");
const users = express.Router();
const upload = require("../config/multer");
const imgUploader = require("../middlewares/imgUploader");

users.post(
    "/",
    upload.fields([{ name: "profilePic" }]),
    checkFields,
    alreadyExist,
    imgUploader,
    userCtrl.postOne
);
users.post("/password", userCtrl.changePass);
users.post("/retrieve", checkFields, userCtrl.retrievePassword);
users.post("/login", checkFields, userCtrl.login);
users.get("/info", authToken, userCtrl.getInfo);
users.post(
    "/info/username-password",
    authToken,
    userCtrl.getInfoByUsernameAndPassword
);
users.get("/auth", authToken, userCtrl.auth);
users.get("/", authToken, userCtrl.getOne);
users.put(
    "/",
    upload.fields([{ name: "profilePic" }]),
    checkFields,
    authToken,
    imgUploader,
    userCtrl.putInfo
);

module.exports = users;
