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
        priorityTask : {
            type: String,
            required: false
        }
        ,
        stateTask: {
            type: String,
            required : false,
        }
    }
    )
const task = mongoose.model("task", TaskSchema);
module.exports = { task };