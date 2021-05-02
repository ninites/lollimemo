const User = require("./schema/user");
class Users {
  static getOne = async ({ id }) => {
    let result;
    try {
      result = await User.findOne({ _id: id });
    } catch (err) {
      console.log(err);
    }
    return result;
  };

  static postOne = async (body) => {
    let newUser;
    try {
      newUser = await new User({ ...body }).save();
    } catch (err) {
      console.log(err);
    }
    return newUser;
  };

  static getAll = async () => {
    let result;
    try {
      result = await User.find();
    } catch (err) {
      console.log(err);
    }
    return result;
  };
}

module.exports = Users;
