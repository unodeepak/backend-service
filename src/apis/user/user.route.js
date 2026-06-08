const routes = require("express").Router();
const UserController = require("./user.controller");
const { checkAuth } = require("../../middleware/auth.middleware");

// Define the route for creating a user
routes.post("/create", UserController.createUser);
routes.post("/login", UserController.loginUser);

routes.get("/get-all-users", checkAuth("admin"), UserController.getAllUsers);
routes.get("/get-user/:id", checkAuth(), UserController.getUserById);


module.exports = routes;
