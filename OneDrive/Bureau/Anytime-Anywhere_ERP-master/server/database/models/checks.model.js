const mongoose = require ('mongoose');
const checkSchema = new mongoose.Schema(
{   
    project: {
        type:String,
        required : false,
    }
,
    clientsList : {
        type:String,
        required:true, 
    }
    
,
    user : {
        type:Array,
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