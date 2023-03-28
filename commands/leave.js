const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });

module.exports = {
    name: "leave",
    aliases: ["leave","disconnect","ayrıl"],
    description: "Komut açıklaması",
    usage: "kullanımı",
    ownerOnly: false,

    run: async (message,args,client) => {
   
        let guildQueue = client.player.getQueue(message.guild.id);
        let leaveChannel = client.player.clientDisconnect

        leaveChannel.leave()

        

        var embed = new MessageEmbed()
        .setDescription('Şarkı durdulurdu.')

        message.channel.send({embeds:[embed]})
    }
}