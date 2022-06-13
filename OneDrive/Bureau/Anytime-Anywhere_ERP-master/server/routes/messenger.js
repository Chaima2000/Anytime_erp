const { user } = require("../database/models/user.model");
exports.getAllUser = async (req,res) => {
  const senderId=req.body.senderId;
  try{
    const users=await user.find({'senderId':senderId});
    res.send(users)
  }catch(err){
    console.log(err)
  }
  }