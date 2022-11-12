require("dotenv").config();
const model = require("../models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const ApiError = require("../error/ApiError");
const { MailerService } = require("../services/mailer");
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

  static getInfoByUsernameAndPassword = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await model.getOne({ username }, false, true);
    const compare = await this.bcryptCompare(password, user, next)
    if (!compare) {
      next(ApiError.unAuth("Login ou mot de passe incorrect"));
      return;
    }
    const result = {
      username : user.username,
      themes : user.themes,
      _id : user._id
    }
    res.status(200).json(result);
  }

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
    let hashPass
    try {
      hashPass = await this.createHashpass(req.body.password);
    } catch (err) {
      next(ApiError.internal('probleme de creation de hash'))
      return
    }
    req.body.password = hashPass;
    let postUser = {}
    try {

      postUser = await model.postOne(req.body);
    } catch (err) {
      next(ApiError.internal('probleme de creation de user'))
    }
    res.status(200).json(postUser);
  };

  static async bcryptCompare(password, selectedUser, next) {
    try {
      const compare = await new Promise((resolve, reject) => {
        bcrypt.compare(password, selectedUser.password, (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      }).catch((err) => err.message);
      return compare
    } catch (err) {
      next(ApiError.unAuth("Login ou mot de passe incorrect"));
      return false
    }
  }

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

    const compare = await this.bcryptCompare(password, selectedUser[0], next);

    if (!compare) {
      next(ApiError.unAuth("Login ou mot de passe incorrect"));
      return;
    }
    const secretKey = process.env.JWT.toString();
    const token = jwt.sign({ id: selectedUser[0].id }, secretKey);
    res.status(200).json({ accesToken: token });
  };

  static changePass = async (req, res, next) => {
    const { password, token, id } = req.body;
    const newPassword = await this.createHashpass(password);

    const filters = {
      password: newPassword,
      userInfo: {
        id: id,
      },
    };
    if (!id) {
      const secretJWTKey = process.env.JWT.toString();
      const tokenVerif = await jwt.verify(
        token,
        secretJWTKey,
        (err, result) => {
          if (err) {
            throw new Error(err);
          }
          return result;
        }
      );
      filters.userInfo.id = tokenVerif.id;
    }

    try {
      const modifiedPass = await model.putOne(filters);
      res.status(200).json(modifiedPass);
    } catch (err) {
      console.error(err);
      next(
        ApiError.internal("Probleme lors de la modification du mot de passe")
      );
    }
  };

  static createHashpass = async (password) => {
    let result;
    try {
      result = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      }).catch((err) => {
        return err;
      });
    } catch (err) {
      next(ApiError.internal("Probleme de bcrypt"));
    }
    return result;
  };

  static putInfo = async (req, res, next) => {
    const users = await model.getAll();
    const { id } = req.body.userInfo;
    const othersUsers = users.filter((user) => {
      return user._id.toString() !== id;
    });
    const canPut = [];
    othersUsers.forEach((otherUser) => {
      for (const key in req.body) {
        if (req.body[key] === otherUser[key]) {
          canPut.push(false);
        }
      }
    });
    if (canPut.includes(false)) {
      next(ApiError.badRequest("Nom d utilisateur ou mail deja utilise"));
      return;
    }
    try {
      const modifiedUser = await model.putOne(req.body);
      res.status(200).json(modifiedUser);
    } catch (err) {
      next(ApiError.internal("Probleme modification"));
    }
  };

  static retrievePassword = async (req, res, next) => {
    const user = await model.getOne(req.body, true);
    if (!user) {
      next(ApiError.unAuth("Cet e-mail n'existe pas"));
      return;
    }
    const secretKey = process.env.JWT.toString();
    const token = jwt.sign({ id: user._id }, secretKey);
    const mailSent = await MailerService.sendRetrieveMail(user, token);
    if (!mailSent) {
      next(ApiError.conflict("Probléme pendant l'envoi du mail"));
      return;
    }
    res.status(200).json(mailSent);
  };
}

module.exports = Users;
