const {MessageEmbed, Client} = require("discord.js");
const randomPuppy = require("random-puppy")

module.exports = {
    name:"meme",
    category:"fun",

    run:async(client,message,args) =>{
        const subReddits = ["meme","dankmeme"]
        const random = subReddits[Math.floor(Math.random()* subReddits.length)];
        const img = await randomPuppy(random);

        const embed =  new MessageEmbed()
    .setImage(img)
.setTitle(`From /r/${random}`) 
.setURL(`https://reddit.com/${random}`)

message.channel.send(embed)
}
}