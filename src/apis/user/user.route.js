const routes = require("express").Router();
const UserController = require("./user.controller");

// Define the route for creating a user
routes.post("/create", UserController.createUserController);

module.exports = routes;
