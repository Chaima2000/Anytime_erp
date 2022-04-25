const { bank } = require("../database/models/bank.model");

exports.getbanks = async (req, res) => {
  var currentPage;
  var searchTerm;
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
  try {
    const banks = await bank
      .find({name: { $regex: ".*" + searchTerm + ".*" }})
      .limit(3)
      .skip((currentPage - 1) * 3)
      .sort({ date: -1 })
      .exec();

    const count = await bank.countDocuments({
      name: { $regex: ".*" + searchTerm + ".*" },
    });
    let totalPages = Math.ceil(count / 3);
    for (let i = 1; i <= totalPages; i++) {
      allPages.push(i);
    }
    res.send({
      banks,
      allPages,
    });
  } catch (err) {
    console.error(err.message);
  }
};
exports.deleteBank =(req,res) => {
  const id = req.params.id;
  bank.findByIdAndRemove(id, (err) => {
    if (err) {
      res.send("ERROR");
    } else {
      res.send("SUCCESS");
    }
  });
}


exports.addBank = (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const balance = req.body.balance;

  const newBank = new bank({
    name: name,
    description: description,
    balance: balance,
  });

  try {
    newBank.save();
    res.send("SUCCESS");
  } catch (e) {
    res.send("ERROR");
    console.log(e);
  }
};
