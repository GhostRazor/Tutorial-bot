const mongoose = require("mongoose")

const dataScheama = mongoose.Schema({
    id:String,
    Money:Number,
    guildID:String,
    daily:String,
    Bank: Number,
    beg:String,

})
module.exports = mongoose.model("Data",dataScheama)