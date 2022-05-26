const { task  } = require("../database/models/task.model");
const {project} = require("../database/models/project.model");
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
    const Urgent = req.body.Urgent;
  try{
    await task.findById(id, (error, row) => {
      row.stateTask= stateTask;
      row.Urgent = Urgent;
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
  const Urgent = req.body.Urgent;
  const projectId=req.body.project;
  const newTask = new task ( {
    nameTask: nameTask,
    stateTask: stateTask,
    descriptionTask: descriptionTask,
    Urgent: Urgent,
    project:projectId
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