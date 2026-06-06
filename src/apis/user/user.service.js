const { return200, return400, return500 } = require("../../constant/return");
const Model = require("../../models");

exports.createUser = async (req) => {
  try {
    const { body } = req;
    if (!body.email || !body.name || !body.password) {
      return return400("All the fields are required: email, name, password");
    }

    const isExist = await Model.User.findOne({ email: req.body.email });
    if (isExist) {
      return return400(`User with email ${req.body.email} already exists`);
    }

    const data = await Model.User.create(req.body);
    return return200("User Created Successfully", data);
  } catch (err) {
    console.error("Error creating user:", err);
    return return500(`Error creating user: ${err.message}`);
  }
};
