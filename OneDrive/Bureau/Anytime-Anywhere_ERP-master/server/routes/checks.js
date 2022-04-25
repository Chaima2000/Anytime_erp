const { check } = require("../database/models/checks.model");
const { project  } = require("../database/models/project.model");
exports.getProjects = async (req, res)=>{
    const projectsList = await project.findById().exec()
    res.send(projectsList);
  }
  exports.addCheck =  (req , res) => {
    const name = req.body.name;
    const state = req.body.state;
    const client = req.body.client;
    const description = req.body.description;
    const type = req.body.type;
    const value = req.body.value;
    const user = req.body.user ;
    const checkproject = req.body.checkproject;
    const newCheck = new check ( {
      name: name,
      state: state,
      client: client,
      description: description,
      type: type,
      value: value,
      user:user,
      checkproject:checkproject,
    });
    try {
        newCheck.save();
      res.send("SUCCESS");
    } catch (e) {
      res.send("ERROR");
      console.log(e);
    }
  }