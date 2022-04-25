const mongoose = require ('mongoose');
const projectSchema = new mongoose.Schema(
{   
    name: {
        type:String,
        required : true,
    }
,
    state : {
        type:String,
        required:false, 
    }
    
,
    client : {
        type:String,
        required:true,
    }
,
    description : {
        type:String,
        required:true,
    }
,
    start : {
        type:String,
        required:true,
    }
,
    end :{
        type : String,
        required:false,
    }
,
    members : {
        type: Array,
        required: true,
    }
, 
   file : {
       type : Array , 
       required : false,
   }
},

)
const project = mongoose.model("project", projectSchema);
module.exports = { project };