const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection, Guild } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });
       
module.exports = {
    name: "unpause",
    aliases: ["unpause"],
    description: "Komut açıklaması",
    usage: "kullanımı",
    ownerOnly: false,
    //Komutun herkese açık mı,
    //ya da sadece geliştiricilere özel mi olduğunu belirtirsiniz.
    run: async (message,args,client) => {
   
        
        let guildQueue = client.player.getQueue(message.guild.id);
        if(guildQueue.setPaused(false))
        {
            return
        }else{
        guildQueue.setPaused(false);
        }

        var embed = new MessageEmbed()
        .setDescription('Şarkı devam ediyor.')

        message.channel.send({embeds:[embed]})
    }
}
