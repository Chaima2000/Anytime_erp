const { task  } = require("../database/models/task.model");
exports.addTask =  (req , res) => {
    const nameTask = req.body.nameTask;
    const descriptionTask = req.body.descriptionTask;
    const priority = req.body.priority;
    const newTask = new task ( {
      nameTask: nameTask,
      descriptionTask: descriptionTask,
      priority:priority
    });
    try {
        newTask.save();
      res.send("SUCCESS");
    } catch (e) {
      res.send("ERROR");
      console.log(e);
    }
  }