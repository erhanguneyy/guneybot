const prefix = require('../config.json')
const ig = require('insta-fetcher')
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });

module.exports = {
    name: "intagram",
    aliases: ["instagram"],
    description: "Komut açıklaması",
    usage: "instagram kullanıcıAdı",
    ownerOnly: false,
    run: async (message, args, client) => {

        var kullanıcıAdı = message.content.slice(prefix.length).trim().split(/ +/g)[1];


        ig.fetchUser(kullanıcıAdı).then(res => {
            if(!res.username){
                message.channel.send('Üzgünüm böyle bir hesap bulunmuyor.')
                return
            }

            
            var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Profile Git")
                        .setStyle('LINK')
                        .setURL(`https://www.instagram.com/${kullanıcıAdı}`)
                )

            var embed = new MessageEmbed()
                .setThumbnail(res.profile_pic_url_hd)
                .addField(`Kullanıcı Adı`, `${res.username}`, true)
                .addField('Adı Soyadı', `~${res.full_name}`, true)
                .addField('Takipçi', `${res.following}`, true)
                .addField('\u200B', '\u200B')
                .addField('Takip', `${res.followers}`, true)
                .addField('Gizli Hesap', `${res.is_private}`, true)
                .addField('Doğrulanmış Hesap', `${res.is_verified}`, true)
                .addField('\u200B', '\u200B')
                .addField('Biyografisi', `~${res.biography}`)

            message.channel.send(
                {
                    embeds: [embed],
                    components: [row]
                })
        })

    }

}
