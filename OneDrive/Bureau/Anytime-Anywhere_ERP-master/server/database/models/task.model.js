const mongoose = require ('mongoose')
const TaskSchema = new mongoose.Schema(

    {   
        nameTask: {
            type:String,
            required : true,
        }
    //     ,
    //     assignedBy : {
    //         type:String,
    //     }
    // ,
    //     state : {
    //         type:String,
    //         required:true,
    //     }
    // ,
    //     assignedTo : {
    //         type:String,
    //         required:true,
    //     }
    ,
    descriptionTask : {
            type:String,
            required:true,
        }
    }

    )
const task = mongoose.model("task", TaskSchema);
module.exports = { task };