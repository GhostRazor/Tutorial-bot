const mongoose = require("mongoose")
const config = require("../../config.json")
const {MessageEmbed} = require("discord.js")

mongoose.connect(config.mongoPass,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const Data = require('../../models/data.js')
const { model } = require("../../models/data.js")

module.exports ={
    name:"bal",
    category:"info",
    aliases:["balance"],

    run:async(client,message,args) =>{
        Data.findOne({
            id: message.author.id
        },(err,data)=>{
            if(!data){
                const newD = new Data ({
                    id:message.author.id,
                    Money:100,
                    daily:0,
                    Bank:0,
                })
                newD.save().catch(err => console.log(err));
                let user = message.mentions.users.first() || message.author ;
                return message.channel.send({embed:{color:"810CEE",description:`${user.tag} you have been 100 coins as starter`}})
            }else{
                let user = message.mentions.users.first() || message.author ;
                let embed = new MessageEmbed()
                .setTitle(`Balance of ${user.tag}`)
                .setDescription(`Money: ${data.Money}\nBank: ${data.Bank}` )
                .setColor("810CEE")
                message.channel.send(embed)
            }
        })
    }
}