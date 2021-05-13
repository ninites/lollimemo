const model = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const ApiError = require("../error/ApiError");
class Users {
  static auth = async (req, res) => {
    res.status(200).send(true);
  };

  static getInfo = async (req, res) => {
    if (!req.body.userInfo) {
      res.sendStatus(404);
      return;
    }
    const { id } = req.body.userInfo;
    const user = await model.getOne({ id: id });
    res.status(200).json(user);
  };

  static getOne = async (req, res) => {
    let user;
    if (Object.keys(req.query).length > 0) {
      user = await model.getOne(req.query);
    } else {
      user = await model.getAll();
    }
    res.status(200).json(user);
  };

  static postOne = async (req, res, next) => {
    let hashPass;
    try {
      hashPass = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      }).catch((err) => {
        return err;
      });
    } catch (err) {
      next(ApiError.internal("Probleme de bcrypt"));
    }
    req.body.password = hashPass;
    const postUser = await model.postOne(req.body);
    res.status(200).json(postUser);
  };

  static login = async (req, res, next) => {
    const users = await model.getAll();
    const { username, password } = req.body;

    const selectedUser = users.filter((usr) => {
      const checkUsername = usr.username === username;
      if (checkUsername) return usr;
    });

    if (selectedUser.length === 0) {
      next(ApiError.unAuth("Cet utilisateur n'existe pas"));
      return;
    }

    let compare;
    try {
      compare = await new Promise((resolve, reject) => {
        bcrypt.compare(password, selectedUser[0].password, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      }).catch((err) => err.message);
    } catch (err) {
      next(ApiError.unAuth("Login ou mot de passe incorrect"));
      return;
    }

    if (!compare) {
      next(ApiError.unAuth("Login ou mot de passe incorrect"));
      return;
    }

    const token = jwt.sign({ id: selectedUser[0].id }, "plop");
    res.status(200).json({ accesToken: token });
  };
}

module.exports = Users;
