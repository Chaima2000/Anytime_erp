const { quick  } = require("../database/models/quickaccess.model");
exports.getElements = async (req, res)=>{
    const elements = await quick.find({}).exec()
    res.send(elements);
}
exports.addelement =  (req , res) => {
    const quickaccess = req.body.quickaccess; 
    const newElement = new quick ( {
      quickaccess: quickaccess,
    });
    try {
        newElement.save();
      res.send("SUCCESS");
    } catch (e) {
      res.send("ERROR");
      alert("ERROR");
      console.log(e)
    }
  }
  
