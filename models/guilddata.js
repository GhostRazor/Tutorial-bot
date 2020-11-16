const mongoose = require("mongoose")

const dataScheama2 = mongoose.Schema({
    guild:String,
    guildname:String,
    guildprefix:String,
})
module.exports = mongoose.model("ServerData",dataScheama2)