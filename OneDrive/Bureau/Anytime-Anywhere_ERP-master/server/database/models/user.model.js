const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    created: {type: mongoose.Schema.Types.ObjectId , ref: 'project' },
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
    }
    ,
    image: {
      type: "string",
      required: false
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
    }
  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = { user };
