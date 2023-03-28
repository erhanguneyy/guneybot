const { translate } = require('bing-translate-api');
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });

const prefix = require('../config.json')
module.exports = {
    name: "çeviri",
    aliases: ["çeviri"],
    description: "Komut açıklaması",
    usage: "kullanımı",
    ownerOnly: false,
    run: async (message,args,client) => {
   
   
        var messageContent = message.content.slice(7).trim()

        translate(messageContent, null, 'en', true).then(res => {
            var embed = new MessageEmbed()
            .setTitle('GüneyBOT çeviri')
            .setDescription("GüneyBOT çeviri komutu kullanarak istediğiniz dilden ingilizceye çeviri yapabilirsiniz.")
            .addField('Çevirilen', `${messageContent}`,true)
            .addField('Sonuç',`${res.translation}`,true)
            .addField('Çevirilen dil', res.language.from.toUpperCase(),true)
            .setFooter('GüneyBOT çeviri')
            .setTimestamp()

            message.channel.send({embeds:[embed]})
          }).catch(err => {
            console.error(err);
          });
    }
}