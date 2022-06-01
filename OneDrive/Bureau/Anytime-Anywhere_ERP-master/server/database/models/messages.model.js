const mongoose = require ('mongoose');
const messageSchema = new mongoose.Schema(
    {
        message:{
            text:{type:String,
            
            required:true}
        },
        users:{
            type:Array
        },
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        }
    }
)
const message = mongoose.model("message", messageSchema);
module.exports = { message };