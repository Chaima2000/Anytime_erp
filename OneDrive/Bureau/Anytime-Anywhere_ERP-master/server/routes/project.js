const { project  } = require("../database/models/project.model");
const { user  } = require("../database/models/user.model");
// const { client  } = require("../database/models/clients.model");
exports.getprojects = async (req, res) => {
  var currentPage;
  var searchTerm;
  var allPages = [];
  if (req.body.currentPage) {
    currentPage = req.body.currentPage;
  } else {
    currentPage = 1;
  }
  if (req.body.searchTerm) {
    searchTerm = req.body.searchTerm;
  } else {
    searchTerm = "";
  }
  try {
    const projects = await project
      .find({name: { $regex: ".*" + searchTerm + ".*" }})
      .limit(9)
      .skip((currentPage - 1) * 9)
      .sort({ date: -1 })
      .exec();

    const count = await project.countDocuments({
      name: { $regex: ".*" + searchTerm + ".*" },
    });
    let totalPages = Math.ceil(count / 9);
    for (let i = 1; i <= totalPages; i++) {
      allPages.push(i);
    }
    res.send({
      projects,
      allPages,
    });
  } catch (err) {
    console.error(err.message);
  }
};
exports.getClient = async (req, res)=>{
  const id=req.body.id;
  const clientList = await client.findById(id).exec()
  res.send(clientList);
}
exports.addProject =  (req , res) => {
  const name = req.body.name;
  const state = req.body.state;
  const projectClient = req.body.client;
  const description = req.body.description;
  const start = req.body.start;
  const end = req.body.end;
  const members = req.body.user;
  const file = req.body.file;
  console.log(req.body.user)

  const newProject = new project ( {
    name: name,
    state: state,
    client: projectClient,
    description: description,
    start: start,
    end: end,
    user: members,
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

exports.updateProject = async (req,res) => {
  const end = req.body.end;
  const id = req.body.id;
  const state = req.body.state;
  try{
    await project.findById(id, (error, row) => {
      row.end = end;
      row.state = state;
      row.save()
    });
  } catch(err) {
    console.log(err)
  }
  res.send('updated')
}





exports.getMembers = async (req, res)=>{
  const membersList = await user.find( {$or: [
    { role: "DEVELOPER" },
    { role: "DESIGNER" },
    { role: "MARKETING" },
  ],}).exec()
  res.send(membersList);
}
exports.getClients = async (req, res)=>{
  const clientsList = await client.find({}).exec()
  res.send(clientsList);
}
exports.getProject = (req, res) => {
  const id = req.body.id;
  const client = req.body.client;
  project.findById(id, (err, row) => {
    if (row) {
      res.send(row.client);
    } else {
      res.send("ERROR");
    }
  });
};

