const mongoose = require ('mongoose');
const checkSchema = new mongoose.Schema(
{   
    checkproject: {
        type:String,
        required : false,
    }
,
ClientId : {
        type:String,
        required:true, 
    }
    
,
    user : {
        type:String,
        required:true,
    }
,
    name : {
        type:String,
        required:true,
    }
,
    description : {
        type:String,
        required:true,
    }
,
    value :{
        type : String,
        required:true,
    }
,
    state : {
        type: String,
        required: true,
    }
, 
   type : {
       type : String , 
       required : true,
   }
},

)
const check = mongoose.model("checks", checkSchema);
module.exports = { check };