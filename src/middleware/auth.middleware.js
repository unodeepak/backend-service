const { return401 } = require("../constant/return");
const Model = require("../models");
const ENV = require("../config/env");
const jwt = require("jsonwebtoken");

exports.checkAuth = (role = "user") => {
  return async (req, res, next) => {
    let token = req.headers?.authorization || req.headers?.Authorization;
    token = token ? token?.replace("Bearer ", "") : null;
    if (!token) {
      const resp = return401("Unauthorized");
      return res.status(resp.statusCode).json(resp);
    }

    const decoded = jwt.verify(token, ENV.JWT_ACCESS_SECRET);
    const user = await Model.User.findById(decoded.id).lean();
    if (!user) {
      const resp = return401("Invalid token");
      return res.status(resp.statusCode).json(resp);
    }
    req.user = user;

    /* Authorization */
    if (user.role !== role && user.role !== "admin") {
      const resp = return401("You don't have access to this resource");
      return res.status(resp.statusCode).json(resp);
    }

    next();
  };
};
