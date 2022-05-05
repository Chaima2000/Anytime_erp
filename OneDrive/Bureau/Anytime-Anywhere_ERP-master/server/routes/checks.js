const { pipeline } = require("nodemailer/lib/xoauth2");
const { check } = require("../database/models/checks.model");
const { project  } = require("../database/models/project.model");

exports.getClient= async  (req,res)=>{
  try{
      const clientList = await project.findById(req.params.id).populate('client', ["society"]);
      const ClientSociety= clientList.client.society;
      res.send(ClientSociety);
      
    }catch(err){
      // res.status(500).json({err:"error"});
        res.send(err)
       } 
}
// exports.getUser = async (req,res) => {
//   try{
//     const userList = await project.findById(req.params.id).populate('user', ["firstName"] );
//     res.json(userList.firstName);
//     console.log(req.params.id[0])
//   }catch(err){
//     res.status(500).json({err:"error"});
//   }
// }
exports.getProjects = async (req, res)=>{
  try{
    const projectsList = await project.find({}).exec()
    res.send(projectsList);
  } catch(err){
    res.send(err)
  }
  
}


  exports.addCheck =  (req , res) => {
    const name = req.body.name;
    const state = req.body.state;
    const clientsList = req.body.clientsList;
    const description = req.body.description;
    const type = req.body.type;
    const value = req.body.value;
    const user = req.body.user ;
    const project = req.body.project;
    const newCheck = new check ( {
      name: name,
      state: state,
      clientsList: clientsList,
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
    }
  }