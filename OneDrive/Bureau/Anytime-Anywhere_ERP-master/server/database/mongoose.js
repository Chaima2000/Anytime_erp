const mongoose = require("mongoose");
mongoose.promise = global.promise;
require("dotenv").config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO DB SUCCESSFULLY");
  })
  .catch((e) => {
    console.log("FAILED TO CONNECT TO DB: ", e);
  });

module.exports = { mongoose };