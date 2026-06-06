const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { PORT } = require("./src/config/env");
const connectDB = require("./src/config/mongoose");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Start the server

app.use("/api", require("./src/routes"));

/* Verify the server is running or not */
app.get("/", (req, res) => {
  res.send("Welcome to the Node.js API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
