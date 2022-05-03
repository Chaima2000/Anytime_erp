const { pipeline } = require("nodemailer/lib/xoauth2");
const {receipt } = require("../database/models/receipt.model");
const {bank } = require("../database/models/bank.model");

exports.getBanks = async (req, res)=>{
    const banksList = await bank.find({}).exec()
    res.send(banksList);
  }
  exports.getreceipts = async (req, res) => {
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
      const receipts = await receipt
        .find({project: { $regex: ".*" + searchTerm + ".*" }})
        .limit(9)
        .skip((currentPage - 1) * 9)
        .sort({ date: -1 })
        .exec();
  
      const count = await receipt.countDocuments({
        project: { $regex: ".*" + searchTerm + ".*" },
      });
      let totalPages = Math.ceil(count / 9);
      for (let i = 1; i <= totalPages; i++) {
        allPages.push(i);
      }
      res.send({
        receipts,
        allPages,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

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