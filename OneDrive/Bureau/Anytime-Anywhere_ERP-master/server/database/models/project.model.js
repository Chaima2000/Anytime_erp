const mongoose = require ('mongoose');
const projectSchema = new mongoose.Schema(
{   
    user :
        [{type: mongoose.Schema.Types.ObjectId , 
         ref: 'user',
         required: true
        }],
    client: {
        type: mongoose.Schema.Types.ObjectId , ref: 'client' , required: true
    },
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
   file : {
       type : Array , 
       required : false,
   }
},

)
const project = mongoose.model("project", projectSchema);
module.exports = { project };