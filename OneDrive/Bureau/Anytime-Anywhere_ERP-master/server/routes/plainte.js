const { plainte } = require("../database/models/plainte.model");
exports.AddPlainte = (req, res) => {
    const {objet,email,raison}= req.body;
    const newPlainte = new  plainte({
      objet:objet,
      email:email,
      raison:raison,
    });
    try {
        newPlainte.save();
        res.send("SUCCESS");
      } catch (e) {
        res.send("ERROR");
        console.log(e);
      }
}
exports.getAll = async(req,res)=>{
const all = await plainte.find({}).exec();
res.send(all)
}