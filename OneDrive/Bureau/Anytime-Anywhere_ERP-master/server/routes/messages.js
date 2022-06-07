const {message} = require("../database/models/messages.model");

  exports.AddMessage = async (req, res) => {
  const {senderName, senderId,receiverId,newMessage,newImage}= req.body;
  const newmessage = new  message({
    senderId: senderId,
    senderName: senderName,
    receiverId: receiverId,
    newMessage:newMessage,
    newImage:newImage
  });
 
  try {
      newmessage.save();
      res.send("SUCCESS");
    } catch (e) {
      res.send("ERROR");
    }
  };
  exports.getMessage= async ( req,res) =>{
    const sender = req.params.id;
    try{
      const messageList = await message.find({'senderId':sender});
      res.json(messageList);
    }catch (e) {
      console.log(e)

  }
}