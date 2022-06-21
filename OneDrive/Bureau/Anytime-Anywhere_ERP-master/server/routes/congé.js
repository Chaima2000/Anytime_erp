const { conge } = require("../database/models/congé.model");
exports.AddCongé = (req, res) => {
    const {objet,email,debut,end,raison}= req.body;
    const newConge = new  conge({
      objet:objet,
      email:email,
      debut:debut,
      end:end,
      raison:raison
    });
    try {
        newConge.save();
        res.send("SUCCESS");
      } catch (e) {
        res.send("ERROR");
        console.log(e);
      }
}
exports.getAll= async(req,res)=>{
    const object= await conge.find({}).exec();
    res.send(object)
}
