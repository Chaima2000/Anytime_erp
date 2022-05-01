const { check } = require("../database/models/checks.model");
const { project  } = require("../database/models/project.model");
const { client  } = require("../database/models/user.model");
exports.getUser= async (req,res)=>{
  const id=req.params.id;
  console.log(id);

  try{
    const projects = await client.findById(id).populate('createWith', ["_id"]);
    console.log(projects);
    res.json(projects)
    
  }catch(err){
    console.log(err);
    return res.status(500).json({err:"error"})
  }
}

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