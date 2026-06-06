const { return500 } = require("../../constant/return");
const UserService = require("./user.service");

exports.createUserController = async (req, res) => {
  try {
    const result = await UserService.createUser(req);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Error in createUserController:", err);
    return return500(err?.message || "Internal Server Error");
  }
};
