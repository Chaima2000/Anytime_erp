const mongoose = require ('mongoose');
const messageSchema = new mongoose.Schema(
    {
        senderId :
        {type: mongoose.Schema.Types.ObjectId , 
         ref: 'user',
         required: true
        },
       senderName:{
           type:String,
       },
       receiverId :
        {type: mongoose.Schema.Types.ObjectId , 
         ref: 'user',
         required: true
        },
       newMessage:{
                    type:String,
                },
       newImage:{
                    type:"string",
                },
       dateMsg:{
        type:String
       }
}, {timestamps : true}
    
)
const message = mongoose.model("message", messageSchema);
module.exports = { message };