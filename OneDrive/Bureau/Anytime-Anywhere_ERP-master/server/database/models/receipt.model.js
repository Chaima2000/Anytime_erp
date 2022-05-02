const mongoose = require ('mongoose');
const receiptSchema = new mongoose.Schema(
{   
    project: {
        type:String,
        required : false,
    }
,
    client : {
        type:String,
        required:true, 
    }
    
,
    bank : {
        type:String,
        required:true,
    }
,
    amount : {
        type:String,
        required:true,
    }
,
    description : {
        type:String,
        required:true,
    }
,
    state : {
        type: String,
        required: true,
    }
},

)
const receipt = mongoose.model("receipts", receiptSchema);
module.exports = { receipt };