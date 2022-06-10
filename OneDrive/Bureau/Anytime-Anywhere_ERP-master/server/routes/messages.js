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
  exports.getMessages =async(req,res)=>{
    const sender=req.body.senderId;
    try{
    const messages= await message.find({'senderId':sender}).exec();
    res.send(messages)
    }catch(e){
      console.log(e)
    }
  }
  exports.getTimeMessage= async ( req,res) =>{
    const id=req.params.id;
    const times=[];
    const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    try{
      for(let i=0;i<id.length;i++){
        const Hours= id[i].createdAt.getHours();
        const minutes= id[i].createdAt.getMinutes();
        const day=id[i].createdAt.getDay();
        const Day= days[day-1]; 
        times[i]=Day+"    "+String((Hours)+":"+minutes)
      }
      res.send(times);
    }
    catch (e) {
      console.log(e)
  }
}
