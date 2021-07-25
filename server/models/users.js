const { User } = require("./schema/schema");
class Users {
  static getOne = async (filter, mail) => {
    const wording = filter.id;

    if (filter.id) {
      delete filter.id;
      filter._id = wording;
    }

    const toRemove = mail ? "-password" : "-password -email";

    let result;
    try {
      result = await User.findOne(filter)
        .populate({
          path: "themes",
          populate: { path: "images", model: "Image" },
        })
        .populate({
          path: "games",
        })
        .select(toRemove);
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

  static putOne = async (body) => {
    const { id } = body.userInfo;
    delete body.userInfo;
    return await User.findOneAndUpdate({ _id: id }, body, {
      new: true,
      useFindAndModify: false,
    });
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
