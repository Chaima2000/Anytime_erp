const { project  } = require("../database/models/project.model");
const { user  } = require("../database/models/user.model");
const multer  = require('multer');
exports.getProjects = (req, res) => {
  project.find({}).then((projects) => {
    res.send(projects)
  });
};
exports.addProject =  (req , res) => {
  const name = req.body.name;
  const state = req.body.state;
  const client = req.body.client;
  const description = req.body.description;
  const start = req.body.start;
  const end = req.body.end;
  const members = req.body.members ;
  const file = req.body.file;
  const newProject = new project ( {
    name: name,
    state: state,
    client: client,
    description: description,
    start: start,
    end: end,
    members:members,
    file:file,
  });
  try {
    newProject.save();
    res.send("SUCCESS");
  } catch (e) {
    res.send("ERROR");
    console.log(e);
  }
}
exports.getProject = (req, res) => {
  const id = req.body.id;
  project.findById(id, (err, row) => {
    if (row) {
      res.send(row);
    } else {
      res.send("ERROR");
    }
  });
};
exports.deleteProject =(req,res) => {
  const id = req.params.id;
  project.findByIdAndRemove(id, (err) => {
    if (err) {
      res.send("ERROR");
    } else {
      res.send("SUCCESS");
    }
  });
}
exports.getMembers = async (req, res)=>{
  const membersList = await user.find({$or: [
    { role: "DEVELOPER" },
    { role: "DESIGNER" },
    { role: "MARKETING" },
  ],}).exec()
  res.send(membersList);
}
exports.getADMIN = async (req, res)=>{
  const admin = await user.find({$or: [
    { role: "ADMIN" },
  ],}).exec()
  res.send(admin);
  console.log(admin)
}
exports.getUsers = (req, res) => {
  user.find({}).then((users) => {
    res.send(users)
  });
};

