const { quick  } = require("../database/models/quickaccess.model");
exports.getElements = async (req, res)=>{
    const quickaccess = await quick.find({}).exec();
    var option=[];
    for(let i=0;i<quickaccess.length;i++){
      
      var table= quickaccess[i].quickaccess;
    for(let j=0;i<table.length;j++){
      console.log(table[j])
    }
    }  
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
  
