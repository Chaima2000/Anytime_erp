const mongoose = require ('mongoose')
const clientSchema = new mongoose.Schema({
    type: {
        type:String,
        required:true
    },
    society: {
        type:String,
        required:true
    },
    activity: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    ceo: {
        type:String,
        required:true
    },
    phone: [{
        type: Object,
        required:true
    }],
    city: {
        type:String,
        required:true
    },
    country: {
        type:String,
        required:true
    },
    zipCode: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    }
})
const client = mongoose.model("client", clientSchema);
module.exports = { client };