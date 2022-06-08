const { user } = require("../database/models/user.model");
exports.getAllUser = async (req,res) => {
  try{
    const users=await user.find({});
    res.send(users)
  }catch(err){
    console.log(err)
  }
  }