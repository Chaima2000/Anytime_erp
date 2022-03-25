const mongoose = require("mongoose");

const bankSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    balance: {
      type: "number",
      required: true,
    },
  },
  { timestamps: true }
);

const bank = mongoose.model("bank", bankSchema);
module.exports = { bank };
