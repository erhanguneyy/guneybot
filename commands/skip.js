const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });

module.exports = {
    name: "skip",
    aliases: ["skip"],
    description: "Komut açıklaması",
    usage: "kullanımı",
    ownerOnly: false,
    //Komutun herkese açık mı,
    //ya da sadece geliştiricilere özel mi olduğunu belirtirsiniz.
    run: async (message,args,client) => {
        
        let guildQueue = client.player.getQueue(message.guild.id);
        if(!guildQueue){
            message.channel.send('Bir ses kanalına bağlı değilim.')
        }
        guildQueue.skip();

        var embed = new MessageEmbed()
        .setDescription('Sıradaki şarkıya geçildi.')

        message.channel.send({embeds:[embed]})
    }
}