const mongoose = require ('mongoose');
const clientSchema = new mongoose.Schema({
    // createWith: {type: mongoose.Schema.Types.ObjectId , ref: "project",required:true },

    type: {
        type:String,
        required:false
    },
    society: {
        type:String,
        required:false
    },
    activity: {
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    ceo: {
        type:String,
        required:false
    },
    phone: [{
        type: Object,
        required:false
    }],
    city: {
        type:String,
        required:false
    },
    country: {
        type:String,
        required:false
    },
    zipCode: {
        type:String,
        required:false
    },
    address: {
        type:String,
        required:false
    }
})
const client = mongoose.model("client", clientSchema);
module.exports = { client };