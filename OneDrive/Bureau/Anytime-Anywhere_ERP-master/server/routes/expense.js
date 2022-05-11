const { expense  } = require("../database/models/expense.model");
exports.getexpenses = async (req, res) => {
  var currentPage;
  var allPages = [];
  if (req.body.currentPage) {
    currentPage = req.body.currentPage;
  } else {
    currentPage = 1;
  }
  try {
    const expenses = await expense
      .find({expenseName: { $regex: ".*"+ ".*" }})
      .limit(3)
      .skip((currentPage - 1) * 3)
      .sort({ date: -1 })
      .exec();

    const count = await expense.countDocuments({
      expenseName: { $regex: ".*" + ".*" },
    });
    let totalPages = Math.ceil(count / 3);
    for (let i = 1; i <= totalPages; i++) {
      allPages.push(i);
    }
    res.send({
      expenses,
      allPages,
    });
  } catch (err) {
    console.error(err.message);
  }
};
exports.editExpense = async (req,res) => {
  const id = req.body.id;
  const expenseValue = req.body.expenseValue;
try{
  await expense.findById(id, (error, row) => {
    row.expenseValue= expenseValue;
    row.save();
  });
} catch(err) {
  console.log(err);
}
res.send('updated')
}
exports.addExpense =  (req , res) => {
    const expenseName = req.body.expenseName;
    const expenseDescription = req.body.expenseDescription;
    const expenseValue = req.body.expenseValue;
    const newExpense = new expense ( {
        expenseName: expenseName,
        expenseDescription: expenseDescription,
        expenseValue: expenseValue,
    });
    try {
        newExpense.save();
      res.send("SUCCESS");
    } catch (e) {
      res.send("ERROR");
      console.log(e);
    }
}
exports.deleteExpense =(req,res) => {
    const id = req.params.id;
    expense.findByIdAndRemove(id, (err) => {
      if (err) {
        res.send("ERROR");
      } else {
        res.send("SUCCESS");
      }
    });
  }
  exports.getExpense = (req, res) => {
    const id = req.body.id;
    expense.findById(id, (err, row) => {
      if (row) {
        console.log(row);
        res.send(row);
      } else {
        res.send("ERROR");
      }
    });
  };