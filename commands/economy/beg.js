const mongoose = require("mongoose")
const config = require("../../config.json")
const {MessageEmbed} = require("discord.js")

mongoose.connect(config.mongoPass,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
const Data = require('../../models/data.js')
const data = require("../../models/data.js")

module.exports={
    name:"beg",
    category:"economy",

    run:async(client,message,args) =>{
        let timeout = 120000;
        let reward = Math.floor(Math.random()* Math.floor(100)) //You can set any number

        Data.findOne({
            id:message.author.id
        },(err,data)=>{
            if(err) console.log(err);
            if(!data){
                const newD = new Data({
                    id:message.author.id,
                    Money:reward,
                    Bank:0,
                    lb:"all",

                    beg:Date.now()
                })
                newD.save().catch(err => console.log(err));
                let member = message.guild.members.cache.random();
                return message.channel.send(`You beg for the first time and you receive $${reward} from ${member}`)
            }else{
                if(timeout- (Date.now()-data.beg) >0){
                    let time = ms(timeout -(Date.now()-data.beg));

                    let embed = new MessageEmbed()
                    .setDescription(`You can beg again in **${time.hours}h ${time.minutes}m ${time.seconds}s**`)
                    .setColor("RANDOM")

                    message.channel.send(embed)
                }else{
                    data.Money +=reward
                    data.beg = Date.now()
                    data.save().catch(err => console.log(err));
                    let member = message.guild.members.cache.random();
                    let embed = new MessageEmbed()
                    .setDescription(`You beg for some money and ${member} finally gives you $${reward}`)
                    .setColor("RANDOM")
                    message.channel.send(embed)

                }
            }
        })
    }
}
