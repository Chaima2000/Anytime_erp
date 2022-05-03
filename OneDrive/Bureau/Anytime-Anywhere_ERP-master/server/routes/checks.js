const { pipeline } = require("nodemailer/lib/xoauth2");
const { check } = require("../database/models/checks.model");
const { project  } = require("../database/models/project.model");
// const { client  } = require("../database/models/clients.model");
exports.getClient= async  (req,res)=>{
  const id=req.body.project;
  console.log(id)
  try{
       const liste = await project.findById(id).populate('client', ["society"]);
      res.status(200).json(liste)}
       catch(err){
         return res.status(500).json({err: "error"});
       }
     
  
}
exports.getProjects = async (req, res)=>{
  const projectsList = await project.find({}).exec()
  res.send(projectsList);
}


  exports.addCheck =  (req , res) => {
    const name = req.body.name;
    const state = req.body.state;
    const ClientId = req.body.ClientId;
    const description = req.body.description;
    const type = req.body.type;
    const value = req.body.value;
    const user = req.body.user ;
    const project = req.body.project;
    const newCheck = new check ( {
      name: name,
      state: state,
      ClientId: ClientId,
      description: description,
      type: type,
      value: value,
      user:user,
      project:project,
    });
    try {
        newCheck.save();
      res.send("SUCCESS");
    } catch (e) {
      res.send("ERROR");
      console.log(e);
    }
  }