const {message} = require("../database/models/messages.model");


  exports.AddMessage = async (req, res) => {
  const {senderName,dateMsg, senderId,receiverId,newMessage,newImage}= req.body;
  const newmessage = new  message({
    senderId: senderId,
    senderName: senderName,
    receiverId: receiverId,
    newMessage:newMessage,
    newImage:newImage,
    dateMsg:dateMsg
  });
 
  try {
      newmessage.save();
      res.send("SUCCESS");
    } catch (e) {
      res.send("ERROR");
    }
  };
  exports.getSenderMessages =async(req,res)=>{
    const senderId=req.body.senderId;
    const receiverId = req.params.id;
    try{
    let messageList= await message.find({}).exec();
    messageList = messageList.filter(m=>m.senderId == senderId && m.receiverId == receiverId ||m.receiverId == senderId && m.senderId == receiverId)
    res.send(messageList)
    }catch(e){
      console.log(e)
    }
  }
  exports.getLastMesg= async(req,res) =>{
    const id=req.params.id;
    try{
      const lastOne = await message.find({'senderId':id});
      res.send(lastOne[lastOne.length-1].id)
    }catch(e){
      console.log(e)
    }
  }
  
