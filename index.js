const { Client,Collection } = require("discord.js")
const mongoose = require("mongoose")
const fs = require("fs")
const client = new Client ({ 
    disableEveryone:"true" // This makes sure that the bot does not mention everyone
});
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/")
const config = require("./config.json") // enter your bot prefix in the config.json file
const prefix = config.prefix;

['command'].forEach(handler=>{
    require(`./handler/${handler}`)(client);
})
try{   
     mongoose.connect(config.mongoPass,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    })
    const Data = require("./models/guilddata")
client.on("ready",()=>{
    console.log("Tutorial Bot is online")
})

client.on("message",async message =>{
try{
    if(message.channel.type !=="dm"){
        Data.findOne({
            guild:message.guild.id
        },(err,data) =>{
            if(err) console.log(err)
            if(!data){
                const newData = new Data({
                    guild:message.guild.id,
                    guildname:message.guild.name,
                    guildprefix:"!",
                })
                newData.save().catch(err=>console.log(err))
            }else{
                try{
                    let prefix = data.guildprefix;
                    if(!message.content.startsWith(prefix) || message.author.bot) return
                    const args = message.content.slice(prefix.length).trim().split(/ +/g)
                    const cmd = args.shift().toLowerCase()
                    if(cmd.length ===0) return;

                    let command = client.commands.get(cmd)
                    if(command)
                    if(!command) return
                    command.run(client,message,args)
                } catch(err) {console.log(err)}
            }
        })
    }else{
        let prefix = "!"
        if(!message.content.startsWith(prefix) || message.author.bot) return
        const args = message.content.slice(prefix.length).trim().split(/ +/g)
        const cmd = args.shift().toLowerCase()
        if(cmd.length ===0) return;

        let command = client.commands.get(cmd)
        if(command)
            command.run(client,message,args)
        
        }
}catch(err){console.log(err)}
})}catch(err){console.log(err)}
client.login("Token")//Enter your bot token here
