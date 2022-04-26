const { check } = require("../database/models/checks.model");
const { project  } = require("../database/models/project.model");
const { client  } = require("../database/models/clients.model");
exports.getClient = (req, res) => {
  const id = req.body.id;
  client.findById(id, (err, row) => {
    if (row) {
      res.send(row);
    } else {
      res.send("ERROR");
    }
  });
}
exports.getProject = async (req, res) => {
  try {
    const projectsList = await project.findById({createWith: req.params.id})
    res.json(projectsList)
  } catch(err) {
    res.status(500).json({err:"Error"})
  }
};


  exports.addCheck =  (req , res) => {
    const name = req.body.name;
    const state = req.body.state;
    const ClientId = req.body.ClientId;
    const description = req.body.description;
    const type = req.body.type;
    const value = req.body.value;
    const user = req.body.user ;
    const checkproject = req.body.checkproject;
    const newCheck = new check ( {
      name: name,
      state: state,
      ClientId: ClientId,
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