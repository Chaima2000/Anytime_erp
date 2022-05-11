const { task  } = require("../database/models/task.model");
exports.getTasks = (req, res) => {
  task.find({}).then((tasks) => {
    res.send(tasks);
  });
};
exports.deleteTask =(req,res) => {
  const id = req.params.id;
  task.findByIdAndRemove(id, (err) => {
    if (err) {
      res.send("ERROR");
    } else {
      res.send("SUCCESS");
    }
  });
}

exports.editTask = async (req,res) => {
    const id = req.body.id;
    const stateTask = req.body.stateTask;
  try{
    await task.findById(id, (error, row) => {
      row.stateTask= stateTask;
      row.save();
    });
  } catch(err) {
    console.log(err);
  }
  res.send('updated')
}


exports.addTask =  (req , res) => {
  const nameTask = req.body.nameTask;
  const stateTask = req.body.stateTask;
  const descriptionTask = req.body.descriptionTask;
  const priorityTask = req.body.priorityTask;
  const newTask = new task ( {
    nameTask: nameTask,
    stateTask: stateTask,
    descriptionTask: descriptionTask,
    priorityTask: priorityTask,
  });
  try {
    newTask.save();
    res.send("SUCCESS");
  } catch (e) {
    res.send("ERROR");
    console.log(e);
  }
}
exports.getTask = (req, res) => {
  const id = req.body.id;
  task.findById(id, (err, row) => {
    if (row) {
      res.send(row);
    } else {
      res.send("ERROR");
    }
  });
};