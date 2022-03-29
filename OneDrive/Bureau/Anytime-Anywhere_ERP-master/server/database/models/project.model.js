const mongoose = require ('mongoose')
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
        required:true,
    }
,
    members : {
        type: Array,
        required: true,
    }
,
    file : {
       type: Array,
    required: false,
}
// nameTask: {
//     type:String,
//     required : false,
// }
// ,
// assignedBy : {
//     type:String,
// }
// ,
// state : {
//     type:String,
//     required:true,
// }
// ,
// assignedTo : {
//     type:Array,
//     required:true,
// }
// ,
// descriptionTask : {
//     type:String,
//     required:false,
// }
},

)
const project = mongoose.model("project", projectSchema);
module.exports = { project };