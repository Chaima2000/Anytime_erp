const { pipeline } = require("nodemailer/lib/xoauth2");
const {receipt } = require("../database/models/receipt.model");
const {bank } = require("../database/models/bank.model");

exports.getBanks = async (req, res)=>{
    const banksList = await bank.find({}).exec()
    res.send(banksList);
  }
  

  exports.addReceipt =  (req , res) => {
    const project = req.body.project;
    const state = req.body.state;
    const client = req.body.client;
    const description = req.body.description;
    const amount = req.body.amount;
    const bank = req.body.bank;
    const newReceipt = new receipt ( {
      project: project,
      state: state,
      client: client,
      description: description,
      amount: amount,
      bank: bank,
    });
    try {
        newReceipt.save();
      res.send("SUCCESS");
    } catch (e) {
      res.send("ERROR");
      console.log(e);
    }
  }