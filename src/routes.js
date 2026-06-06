const routes = require("express").Router();
const userRoutes = require("./apis/user/user.route");

// Define the route for creating a user
routes.use("/user", userRoutes);

module.exports = routes;