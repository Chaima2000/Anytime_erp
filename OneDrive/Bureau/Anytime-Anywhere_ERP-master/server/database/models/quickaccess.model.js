const mongoose = require("mongoose");

const quickaccessSchema = mongoose.Schema(
    {
        quickaccess :{
        type: Array,
        required: false,
      }
    }
  );
  
const quick = mongoose.model("quickaccess", quickaccessSchema);
module.exports = { quick };
  