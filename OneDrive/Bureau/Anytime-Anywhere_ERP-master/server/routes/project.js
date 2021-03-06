const { project  } = require("../database/models/project.model");
const { user  } = require("../database/models/user.model");
const { client  } = require("../database/models/clients.model");
exports.getprojects = async (req, res) => {
  var currentPage;
  var searchTerm;
  var filter;
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
  if (req.body.filter) {
    filter = req.body.filter;
  } else {
    filter = "";
  }
    try {
        if(filter == "start"){
          const projects = await project
        .find({start: { $regex: ".*" + searchTerm + ".*" }})
        .limit(9)
        .skip((currentPage - 1) * 9)
        .sort({ date: -1 })
        .exec();
      const count = await project.countDocuments({
        start: { $regex: ".*" + searchTerm + ".*" },
      });
      let totalPages = Math.ceil(count / 9);
      for (let i = 1; i <= totalPages; i++) {
        allPages.push(i);
      }
      res.send({
        projects,
        allPages,
      });
        }
        else if (filter == "end"){
            const projects = await project
          .find({end: { $regex: ".*" + searchTerm + ".*" }})
          .limit(9)
          .skip((currentPage - 1) * 9)
          .sort({ date: -1 })
          .exec();
        const count = await project.countDocuments({
          end: { $regex: ".*" + searchTerm + ".*" },
        });
        let totalPages = Math.ceil(count / 9);
        for (let i = 1; i <= totalPages; i++) {
          allPages.push(i);
        }
        res.send({
          projects,
          allPages,
        })
      }else if (filter == "state"){
            const projects = await project
          .find({state: { $regex: ".*" + searchTerm + ".*" }})
          .limit(9)
          .skip((currentPage - 1) * 9)
          .sort({ date: -1 })
          .exec();
        const count = await project.countDocuments({
          state: { $regex: ".*" + searchTerm + ".*" },
        });
        let totalPages = Math.ceil(count / 9);
        for (let i = 1; i <= totalPages; i++) {
          allPages.push(i);
        }
        res.send({
          projects,
          allPages,
        })
      }else {
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
    })
  }
    }catch (err) {
      res.send(err)
      }
  };
exports.getClients = async (req, res)=>{
  const clientList = await client.find({}).exec()
  res.send(clientList);
}
exports.getProjectNumber = async (req,res)=>{
  const projectnumber = await project.find()
  res.send(projectnumber)
  }


exports.addProject =  (req , res) => {
  const name = req.body.name;
  const state = req.body.state;
  const projectClient = req.body.client;
  const description = req.body.description;
  const start = req.body.start;
  const end = req.body.end;
  const user= req.body.user;
  const file = req.body.file;

  const newProject = new project ( {
    name: name,
    state: state,
    client: projectClient,
    description: description,
    start: start,
    end: end,
    user: user,
    file:file,
  });
  try {
    newProject.save();
    res.send("SUCCESS");
  } catch (e) {
    res.send("ERROR");
    alert("ERROR")
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
  const state = req.body.state;
  const id = req.body.id;
  try{
    await project.findById(id, (error, row) => {
      row.end = end;
      row.state = state;
      row.save()
    });
  } catch(err) {
    alert("Error")
  }
  res.send('updated')
}

exports.getMembers = async (req, res)=>{
  const members = await user.find( {$or: [
    { role: "DEVELOPER" },
    { role: "DESIGNER" },
    { role: "MARKETING" },
  ],}).exec()
  res.send(members);
}
exports.getClients = async (req, res)=>{
  const clientsList = await client.find({}).exec()
  res.send(clientsList);
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
exports.getRowProject = async (req,res) => {
  const id=req.params.id;
  try {
    const user = await project.find({'user':id});
   
    res.send(user);
  }catch(err){
    res.send("error");
  }
}

  exports.getUserImage = async (req,res) => {
    try{
      const userList = await project.findById(req.params.id).populate('user', ["image"] );
      const image=[];
      for(let i=0;i<userList.user.length;i++){
        const userFullName= userList.user[i].image;
        image[i]=userFullName;
      }
      res.send(image);
    }catch(err){
      res.send(err);
    }
  }
exports.getRowProjectId = async (req,res) => {
  const id=req.params.id;
  var projectId=[];
  try {
    const projects = await project.find({'user':id});
    for(let i=0;i<projects.length;i++){
      projectId[i]= projects[i]._id;
    }
    res.send(projectId)
  }catch(err){
    res.send("error");
    console.log(err)
  }
}

