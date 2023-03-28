const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });
const ytdl = require("discord-ytdl-core");


module.exports = {
    name: "play",
    aliases: ["oynat", "p"],
    description: "Komut açıklaması",
    usage: "play şarkıAdı",
    ownerOnly: false,
    run: async (message, args, client) => {


        if (!message.member.voice.channel) {
            var embed = new MessageEmbed()
                .setColor('RED')
                .setDescription('**Lütfen bir ses kanalına girin!**')
            message.channel.send({ embeds: [embed] })
            return
        }


         client.player.on('error', (error,queue) => {
            var errorEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle('Şarkı oynatılamıyor')
            .setDescription('Oynatmak istediğiniz şarkıyla ilgili bir sorun var GüneyBOT bu şarkıyı oynatamıyor.')
        
            var errorRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Daha fazla bilgi için")
                    .setStyle('LINK')
                    .setURL(`https://discord-guneybot.glitch.me`)
            )
        
            message.channel.send(
                {
                embeds:[errorEmbed],
                components:[errorRow]
            })
            return
        }) 

        if (!args[0]) {
            return message.channel.send('Lütfen bir şarkı adı girin.')
        }


        var musicName = message.content.slice(5).trim()
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.play(args.join(' '), {
            filter: "audioonly"
        })


        var row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Şarkıya git")
                    .setStyle('LINK')
                    .setURL(`${song.url}`)
            )


        var embed = new MessageEmbed()
            .setTitle(song.name)
            .setThumbnail(song.thumbnail)
            .addField('Kanal', `${song.author}`)
            .addField('Şarkı süresi', `${song.duration}`)
            .setURL(song.url)
            .setFooter('GüneyBOT Müzik')
            .setTimestamp()

        message.channel.send(
            {
                embeds: [embed],
                components: [row]
            })

    }

}