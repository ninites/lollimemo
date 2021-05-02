const model = require("../models/users");
const jwt = require("jsonwebtoken");

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

  static postOne = async (req, res) => {
    const tryNew = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };

    const missingFields = {};
    for (const key in tryNew) {
      if (!req.body[key]) {
        missingFields[key] = "Merci de remplir " + [key];
      }
    }

    if (Object.keys(missingFields).length > 0) {
      res.status(400).json(missingFields);
      return;
    }

    const postUser = await model.postOne(req.body);
    res.status(200).json(postUser);
  };

  static login = async (req, res, next) => {
    const tryNew = {
      username: req.body.username,
      password: req.body.password,
    };

    const missingFields = {};
    for (const key in tryNew) {
      if (!req.body[key]) {
        missingFields[key] = "Merci de remplir " + [key];
      }
    }

    if (Object.keys(missingFields).length > 0) {
      res.status(400).json(missingFields);
      return;
    }

    const users = await model.getAll();
    const { username, password } = req.body;

    const selectedUser = users.filter((usr) => {
      const checkUsername = usr.username === username;
      const checkPassword = usr.password === password;
      if (checkPassword && checkUsername) return usr;
    });

    if (selectedUser.length === 0) {
      res.status(400).json({ err: "Login ou mot de passe incorrect" });
      return;
    }

    const token = jwt.sign({ id: selectedUser[0].id }, "plop");
    res.status(200).json({ accesToken: token });
  };
}

module.exports = Users;
