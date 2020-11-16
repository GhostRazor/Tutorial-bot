const mongoose = require("mongoose")
const config = require("../../config.json")
const {MessageEmbed} = require("discord.js")
const ms = require('parse-ms')

mongoose.connect(config.mongoPass,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const Data = require('../../models/serverdata.js')


module.exports = {
    name: "prefix",
    description: "Change the Bot's Prefix",
    aliases: [],
    category: "Configuration",
    usage: "<prefix>prefix new prefix",
    run: async (client, message, args) => {
        const right = client.emojis.cache.find(emoji => emoji.name === 'tick');
        const x = client.emojis.cache.find(emoji => emoji.name === 'fu');
        const off = client.emojis.cache.find(emoji => emoji.name === 'disable');
        const on = client.emojis.cache.find(emoji => emoji.name === 'enable');
        Data.findOne({
            gid:message.guild.id
        },(err,data)=>{
            if(err) console.log(err);
            if(!data){
const newD = new Data({
    gid:message.guild.id,
gname:message.guild.name,
gprefix:"a>",
allowedc:[],
gxp:0,
glevel:0,
emoji1:"👍🏻",
emoji2:"🤷🏻‍♂️",
emoji3:"👎🏻",
joinmessage:"{USER} has joined {SERVER}! We now have {MEMBERCOUNT} Members! Hope u enjoy your Stay! ",
leavemessage:"{USER} has left {SERVER}! We now have {MEMBERCOUNT} Members! Hope they come back soon... ",
modlog:"disable",
roleupdates:"disable",
channelupdates:"disable",
serverupdates:"disable",
memberlog:"disable",
messagelog:"disable",
joinchannel:"disable",
leavechannel:"disable",
image:"disable"
           })
newD.save().catch(err => console.log(err));
}else{
    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed:{color:"51c84f",description:`${x} ${message.author.tag} You are not authorized to use this command. You need ``Manage Guild`` permission to use this command`}}); 
    if(!message.guild.me.hasPermission('MANAGE_GUILD')) return message.channel.send({embed:{color:"51c84f",title:`${x} Missing Permissions`,description:"Heck, looks like I am missing ``Manage Guild`` permission"}})//If The Author Doesnt Have Manage guild permission return a message
      if(!args[0]) return message.channel.send({embed:{color:"51c84f",title:`${x} Missing Arguments`,description:`The current prefix of this server is **${data.gprefix}**\nFor changing the current prefix use ➡️ <prefix>prefix new prefix`}}); //If there isn't a prefix then return a message
      
    let oldp = data.gprefix;
    
       data.gprefix = data.gprefix.replace(oldp, args[0]);
    data.save().catch(err => console.log(err));
      message.channel.send({embed:{color:"51c84f",description:`**This server's prefix has been changed to ${args[0]}**`}}); //send message to that channel
      return; //return
    }
    }
                     )
    }
}