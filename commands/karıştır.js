const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });

module.exports = {
    name: "karıştır",
    aliases: ["karıştır",'karıstır'],
    description: "Komut açıklaması",
    usage: "kullanımı",
    ownerOnly: false,
    //Komutun herkese açık mı,
    //ya da sadece geliştiricilere özel mi olduğunu belirtirsiniz.
    run: async (message,args,client) => {
   
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.shuffle();

        var embed = new MessageEmbed()
        .setDescription('Şarkı sırası karıştırıldı.')

        message.channel.send({embeds:[embed]})
    }
}