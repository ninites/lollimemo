const model = require("../models/users");
const jwt = require("jsonwebtoken");

class Users {
  static getOne = async (req, res) => {
    const { id } = req.params;
    const user = await model.getOne(id);
    res.status(200).json(user);
  };

  static postOne = async (req, res) => {
    const tryNew = {
      email : req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
   
    const missingFields = {};
    for (const key in tryNew) {
      if (!req.body[key]) {
        console.log(key , req.body[key]);
        missingFields[key] = "Merci de remplir " + [key];
      }
    }

    if (Object.keys(missingFields).length > 0) {
      res.status(400).json(missingFields);
      return;
    }

    const postUser = await model.postOne(req.body);
    const newUser = await model.getOne(postUser);
    res.status(200).json(newUser);
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
      res.status(400).json("Login ou mot de passe incorrect");
      return;
    }

    const token = jwt.sign({ id: selectedUser[0].id }, "plop");
    res.status(200).json({ accesToken: token });
  };
}

module.exports = Users;
