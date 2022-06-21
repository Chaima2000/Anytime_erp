const mongoose = require ('mongoose');
const congeSchema = new mongoose.Schema({
    objet:{
        type:String
    },
    email:{
        type:String
    },
    debut:{
        type:String
    },
    end:{
        type:String
    },
    raison:{
        type:String
    }
},{ timestamps: true })
const conge = mongoose.model("conge", congeSchema);
module.exports = { conge };