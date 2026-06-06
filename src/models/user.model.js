const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    age: {
      type: Number,
      min: 0,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("users", userSchema, "users");