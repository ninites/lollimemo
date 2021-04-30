const mysql = require("../config/mysql");

class Users {
  static getOne = async (id) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [result] = await mysql.query(sql, id);
    return result;
  };

  static postOne = async (body) => {
    const sql = "INSERT INTO users SET ? ";
    const [result] = await mysql.query(sql, body);
    return result.insertId;
  };

  static getAll = async () => {
    const sql = "SELECT * FROM users";
    const [result] = await mysql.query(sql);
    return result;
  };


}

module.exports = Users;
