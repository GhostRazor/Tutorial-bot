const mongoose = require("mongoose")
const config = require("../../config.json")
const {MessageEmbed, Client} = require("discord.js")

mongoose.connect(config.mongoPass,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const Data = require('../../models/data.js')
const { model } = require("../../models/data.js")

module.exports ={
    name:"daily",

    run:async(client,message,args) =>{
        let timeout = 86400000
        let reward = 1500
        Data.findOne ({
            id:message.author.id

        },(err,data) =>{
            if(err) console.log(err);
            if(!data){
                const newD = new Data({
                    id:message.author.id,
                    Money:reward,
                    Bank:0,
                    lb:"all",
                    daily:Date.now()
                })
                newD.save().catch(err => console.log(err))
                 return message.channel.send("Here are your first daily reward")
            }else{
                if(timeout -(Date.now()-data.daily)>0){
                    let time = ms(timeout-(Data.now()-data.daily));
                    let embed = new MessageEmbed()
                    .setTitle("Slow down")
                    .setDescription(`You need to wait ${time.hours}h ${time.minutes}m ${time.seconds}s to get more money`)

                    message.channel.send(embed)
                }else{
                    data.Money +=reward
                    data.daily =Date.now()
                    data.save().catch(err => console.log(err))

                    let embed = new MessageEmbed()
                    .setTitle("Your daily reward")
                    .setDescription(`You received your daily reward of $${reward}`)
                    message.channel.send(embed)
                }
            }
        })
    }
}