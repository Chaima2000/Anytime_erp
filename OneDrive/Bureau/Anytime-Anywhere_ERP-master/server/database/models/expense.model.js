const mongoose = require ('mongoose');
const expenseSchema = new mongoose.Schema(
{   
    expenseName: {
        type:String,
        required : true,
}
,
    expenseDescription : {
        type:String,
        required:true, 
}   
,
    expenseValue : {
        type:String,
        required:true,
}
}

)
const expense = mongoose.model("expense", expenseSchema);
module.exports = { expense };