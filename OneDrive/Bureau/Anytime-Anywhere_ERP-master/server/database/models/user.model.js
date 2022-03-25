const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: "string",
      required: true,
    },
    lastName: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    token: {
      type: "string",
      required: false,
    },
    role: {
      type: "string",
      default: "USER",
    },
    active: {
      type: "boolean",
      default: false,
    },
    profilePicture: {
      type: "string",
    },
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = { user };
