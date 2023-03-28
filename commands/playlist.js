const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });

module.exports = {
    name: "playlist",
    aliases: ["playlist"],
    description: "Komut açıklaması",
    usage: "play şarkıAdı",
    ownerOnly: false,
    run: async (message, args, client) => {

        if (!args[0]) {
            return message.channel.send('Lütfen bir oynatma listesi linki girin.')
        }


        var musicName = message.content.slice(5).trim()
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.playlist(args.join(' '))


        var row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Oynatma listesine git")
                        .setStyle('LINK')
                        .setURL(`${song.url}`)
                )


        
        message.channel.send(
            {
                content:"▶ Oynatma listesi çalmaya başladı.",
                components:[row]
            })

    }
}