const mongoose = require ('mongoose')
const TaskSchema = new mongoose.Schema(

    {   
        nameTask: {
            type: String,
            required : false,
        }
        ,
        descriptionTask : {
            type: String,
            required : false,
        }
        ,
        Urgent : {
            type: String,
            required: false
        }
        ,
        stateTask: {
            type: String,
            required : false,
        },
        project :
        {type: mongoose.Schema.Types.ObjectId , 
         ref: 'project'
        },
    }
    )
const task = mongoose.model("task", TaskSchema);
module.exports = { task };