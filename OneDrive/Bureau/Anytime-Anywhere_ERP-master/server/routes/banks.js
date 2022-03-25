const { bank } = require("../database/models/bank.model");

exports.getBanks = (req, res) => {
  bank.find({}).then((banks) => {
    res.send(banks);
  });
};

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
