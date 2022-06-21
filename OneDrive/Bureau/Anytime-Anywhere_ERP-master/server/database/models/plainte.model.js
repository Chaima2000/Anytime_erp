const mongoose = require ('mongoose');
const plainteSchema = new mongoose.Schema(
{   
    objet:{
        type:String
    },
    email:{
        type:String
    },
    raison:{
        type:String
    }
},

)
const plainte = mongoose.model("plainte", plainteSchema);
module.exports = { plainte };