const {MessageEmbed} = require("discord.js");
const userReg = RegExp(/<@!?(\d+)>/);

module.exports = {
    name: "ban",
    category: "Moderation",

    run: async(client, message, args) => {

        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0];
        const member = await message.client.users.fetch(userID).catch(() => null);
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) {

            if (!message.member.hasPermission("BAN_MEMBERS")) {
                return message.channel.send(`:lock: **You don't have the required permission(s) to run this command.**`)
            }


                    if(!args[0]) {
                        return message.channel.send(` **You are missing a required command argument** \`user\`**. Please try again as** \`!ban [user] (reason)\``)
                    }

            if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                return message.channel.send(`:lock: **I require** \`Ban Members\` **permission(s) to execute this command.**`)
            }

            if(!member) {
                return message.channel.send(` **User** "${args[0]}" **not found**, **please try again but this time @mention the user or use a valid userID.**`)
            }

            if (member.id === message.author.id) {
                return message.channel.send(`:sweat_smile: **Err.. You can't ban yourself...**`)
            }

            let reason = args.slice(1).join(' ');
            if (!reason) reason = "No Reason Specified";

            message.channel.send(` **${member.tag}** (\`${member.id}\`) has been banned for \`${reason}\``)

            message.guild.members.ban(member.id, {
                days: 7,
                reason: `${reason}`
            })
        }

        if (user) {

            if (!message.member.hasPermission("BAN_MEMBERS")) {
                return message.channel.send(`:lock: **You don't have the required permission(s) to run this command.**`)
            }

            if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                return message.channel.send(`:lock: **I require** \`Ban Members\` **permission(s) to execute this command.**`)
            }

            if (user.user.id === message.author.id) {
                return message.channel.send(`:sweat_smile: **Err.. You can't ban yourself...**`)
            }

            if (message.guild.member(user).roles.highest.position >= message.guild.me.roles.highest.position) {
                return message.channel.send(`I don't have enough permissions to ban **${user.user.tag}**, make sure that my highest role is higher than that of **${user.user.tag}**.`)
            }

            if (message.guild.member(user).roles.highest.position >= message.member.roles.highest.position) {
                return message.channel.send(`You can't ban **${user.user.tag}** as their highest role is the same as yours or higher than yours.`)
            }

            let reason = args.slice(1).join(' ');
            if (!reason) reason = "No Reason Specified";

            message.channel.send(` **${user.user.tag}** (\`${user.user.id}\`) has been banned for \`${reason}\``)

            user.ban({
                days: 7,
                reason: `${reason}`
            });

        }
    }
}
