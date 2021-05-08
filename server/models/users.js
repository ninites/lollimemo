const { User } = require("./schema/schema");
class Users {
  static getOne = async (filter) => {

    const wording = filter.id;
    delete filter.id;
    filter._id = wording;

    let result;

    try {
      result = await User.findOne(filter).populate({
        path: "themes",
        populate: { path: "images", model: "Image" },
      });
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
