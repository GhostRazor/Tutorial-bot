const {MessageEmbed,Message} = require("discord.js");
module.exports = {
    name:'ping',
    category:'info',
    description:' Returns API Latency and API ping',
    usage:'<ping>',
    
    run: async(client,message,args) =>{
    const msg = await message.channel.send("Pinging.....");
    
    const embed = new MessageEmbed()
    .setTitle("Latency and Ping")
    .setColor('5A00FF')
    .setDescription(`Pong!!\n Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI Ping ${Math.round(client.ws.ping)}ms`)
   message.channel.send(embed)
    }
}