const { return500 } = require("../../constant/return");
const UserService = require("./user.service");

exports.createUser = async (req, res) => {
  try {
    const result = await UserService.createUser(req);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Error in createUser:", err);
    return return500(err?.message || "Internal Server Error");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await UserService.loginUser(req);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Error in loginUser:", err);
    return return500(err?.message || "Internal Server Error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await UserService.getAllUsers(req);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    return return500(err?.message || "Internal Server Error");
  }
};

exports.getUserById = async (req, res) => {
  try {
    const result = await UserService.getUserById(req);
    return res.status(result.status).json(result);
  } catch (err) {
    console.error("Error in getUserById:", err);
    return return500(err?.message || "Internal Server Error");
  }
};