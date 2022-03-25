const { task  } = require("../database/models/task.model");
exports.addTask =  (req , res) => {
    const taskName = req.body.taskName;
    const descriptionTask = req.body.descriptionTask;
    const newTask = new task ( {
      taskName: taskName,
      descriptionTask: descriptionTask,
    });
    try {
        newTask.save();
      res.send("SUCCESS");
      console.log(taskName);
    } catch (e) {
      res.send("ERROR");
      console.log(e);
    }
  }