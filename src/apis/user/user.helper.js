const jwt = require("jsonwebtoken");
const CONFIG = require("../../config/env");

exports.generateToken = (payload) => {
  try {
    const user = {
      id: payload._id,
    };
    const token = {
      accessToken: jwt.sign(user, CONFIG.JWT_ACCESS_SECRET, {
        expiresIn: CONFIG.ACCESS_TOKEN_EXP,
      }),
      refreshToken: jwt.sign(user, CONFIG.JWT_REFRESH_SECRET, { expiresIn: CONFIG.REFRESH_TOKEN_EXP }),
    };
    return token;
  } catch (err) {
    console.error("Error in generateToken:", err);
    throw new Error("Failed to generate token");
  }
};
