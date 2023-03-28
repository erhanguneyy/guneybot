const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction, Collection, MessageSelectMenu, Message } = require("discord.js");
const client = new Client({ intents: Object.values(Intents.FLAGS).reduce((p, c) => p + c, 0) });
const { token, prefix } = require('./config.json');
const mongoose = require('mongoose');
const fs = require('fs')
const guildDB = require('./db/setting')
const proton = require("proton-io")
const ig = require('insta-fetcher')
const translate = require("translate");
const ffmpeg = require('ffmpeg')
const { Player } = require("discord-music-player");
const ytdldc = require("discord-ytdl-core");
const ytdl = require('ytdl-core')
const HttpsProxyAgent = require('https-proxy-agent');
const player = new Player(client, {
    leaveOnEmpty: false,
    leaveOnEnd:false,
    leaveOnStop:false,
    timeout:10000
});


const proxy = 'http://user:pass@111.111.111.111:8080';
const agent = HttpsProxyAgent(proxy);

client.player = player;


let komutKlasör = "./commands"
let eventLoad = "./events"
let ownerIDs = ["349645675182686210"]
let owner = true;
let defaultCommands = true;
let etiketiPrefixOlarakKullan = false;


client.on('message', async (message) => {
    komutYukle.message(
        message, prefix, {
        botlaraCevapVer, etiketiPrefixOlarakKullan,
        etiketlePrefixOgren
    }
    )
})




const komutYukle =
    new proton(client, komutKlasör, eventLoad, ownerIDs, { owner, defaultCommands })
let botlaraCevapVer = false;
let etiketlePrefixOgren = true;



mongoose.connect('mongodb+srv://erhanguney:qwertyu67@guneybot.hq6zp.mongodb.net/guneybot?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log('Veritabanı bağlantısı kuruldu')
    console.log(mongoose)
})

client.once('ready', () => {
    console.log(`${client.user.username} Aktif`)
});





client.on('messageCreate', message => {
    if (message.content === `${prefix}ping`) {
        var embed = new MessageEmbed()
            .setTitle(`GüneyBOT`)
            .setColor('BLUE')
            .addField('Ping', Math.round(client.ws.ping) + 'ms')
            .setFooter("GüneyBOT")
            .setTimestamp()
        return message.channel.send({ embeds: [embed] })
    }
})

client.on('messageCreate', message => {
    if (message.content === `${prefix}kurallar`) {
        var row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("acceptRule")
                    .setLabel("Kabul et!")
                    .setStyle(1)
            )
        var embed = new MessageEmbed()
            .setTitle('Kurallar')
            .setDescription("1. Herkese saygılı davran. Hiçbir hakaret, cinsiyet ayrımı, ırkçılık veya nefret söylemi hoş görülmeyecek 2. Yetkililerden izin almadan spam veya kendi reklamını sunucu davetleri, reklamlar vb. yapmak yasaktır. Buna üyelere DM göndermek de dahild3. NSFW veya müstehcen içerikler yasaktır. Buna metinler, görseller veya çıplaklık, cinsellik, yüksek şiddet ya da diğer rahatsız edici içeriklere sahip bağlantılar dahildir.4. Sesli kanallarda bas açmak vb. hareketler yapmak yasaktır!5. Metin kanallarını amacı dışında kullanmak yasaktır. 6. Kurallara aykırı veya seni rahatsız eden bir şey görürsen yöneticilere bildir. Bu sunucunun samimi bir yer olmasını istiyoruz")
            .setFooter("GüneyBOT")
            .setTimestamp()
        return message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
})

client.on('interactionCreate', async (interaction) => {

    if (interaction.customId == 'acceptRule') {
        if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.get('865692543113756692')) {
            await (interaction.reply({ content: 'Zaten kuralları kabul  etmişsiniz.', ephemeral: true }))
        } else {
            interaction.guild.members.cache.get(interaction.user.id).roles.add('865692543113756692')
            await interaction.reply({ content: "Başarı ile kuralları kabul ettiniz", ephemeral: true })
        }

    }
})

client.on('messageCreate', async message => {
    if (message.content === `${prefix}davet`) {
        message.reply('https://discord.com/oauth2/authorize?client_id=719156651420155955&scope=bot&permissions=8')
    }
})

client.on('channelCreate', async channel => {
    const config = await guildDB.findOne({ guildid: channel.guild.id })
    const logkanalid = config.get('logKanal')

    var embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Kanal Oluşturuldu')
        .addField('Kanal Adı', channel.name)
        .setFooter(`Kanal ID ${channel.id}`)
        .setTimestamp()

    client.channels.cache.get(logkanalid).send({ embeds: [embed] })
})

client.on('channelDelete', async channel => {
    const config = await guildDB.findOne({ guildid: channel.guild.id })
    const logkanalid = config.get('logKanal')

    var embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Kanal Silindi')
        .addField('Kanal Adı', channel.name)
        .setFooter(`Kanal ID ${channel.id}`)
        .setTimestamp()

    client.channels.cache.get(logkanalid).send({ embeds: [embed] })
})

client.on('channelUpdate', async (oldChannel, newChannel) => {
    const config = await guildDB.findOne({ guildid: oldChannel.guild.id })
    const logkanalid = config.get('logKanal')

    var embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Kanal Güncellendi')
        .addField('Eski adı', oldChannel.name)
        .addField('Yeni adı', newChannel.name)
        .setFooter(`Kanal ID ${oldChannel.id}`)
        .setTimestamp()
    client.channels.cache.get(logkanalid).send({ embeds: [embed] })

})

client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
    const config = await guildDB.findOne({ guildid: oldEmoji.guild.id })

    var embed = new MessageEmbed()
        .setColor('BLUE')
        .setTitle(`Emoji Güncellendi`) //<:blobreach:123456789012345678>
        .addField('Güncellenen emoji', `<:${newEmoji.name}:${newEmoji.id}>`)
        .addField('Eski adı', oldEmoji.name, true)
        .addField('Yeni adı', newEmoji.name, true)
        .setTimestamp()
    client.channels.cache.get(logkanalid).send({ embeds: [embed] })
})

client.on('messageCreate', async message => {

    const config = await guildDB.findOne({ guildid: message.guild.id })
    const linkEngel = config.get('linkEngel')
    if (linkEngel === message.guild.id) {

        const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
        if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            message.delete()
            message.channel.send('Bu sunucuda reklam yapamazsın').then(message => message.delete({ timeout: 3000 }))
        }
    }
})

client.on('messageCreate', async message => {
    const config = await guildDB.findOne({ guildid: message.guild.id })
    const kufurEngel = config.get('kufurEngel')

    if (kufurEngel === message.guild.id) {
        const kufur = ["amk", "aq", "sik", "oç", "orospu", "piç", "ananı", "yarrak", "orospu çocuğu", "anneni sikeyim", "sikeyim", "sikeceğim", "yarak"];
        if (kufur.some(word => message.content.toLowerCase().includes(word))) {
            message.delete()
            message.channel.send('Bu sunucuda küfür edemezsin').then(message => message.delete({ timeout: 3000 }))
        }
    }
})

client.on('messageCreate', async message => {
    if (message.content === `${prefix}yardım`) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('select')
                    .setPlaceholder('Kategori seç')
                    .addOptions([
                        {
                            label: 'Moderasyon',
                            value: 'first_option',
                        },
                    ]),

            );
        var embed = new MessageEmbed()
            .setTitle(`${client.user.username} Komutları`)
            .setDescription('Komutları görmek için aşağıdan kategori seçin. Sorununuz ile ilgili yardım için GüneyBOT destek sunucusuna katılabilirsiniz : https://discord.gg/sjRuberd')
            .addField('Moderasyon','Moderasyon komutlarını gösterir')
            .addField('Karşılama','Karşılama komutlarını gösterir')
            .setFooter(client.user.username)
            .setTimestamp()
        await message.reply({ embeds: [embed], components: [row] });
    }
})


client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Kategori seç')
                .addOptions([
                    {
                        label: 'Moderasyon',
                        value: 'first_option',
                    }
                ]),

        );

        const karsilamaRow = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('selectModerasyon')
                .setPlaceholder('Kategori seç')
                .addOptions([
                    {
                        label: 'Moderasyon',
                        value: 'first_option',
                    }
                ]),

        );

        const moderasyonRow = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('selectKarsilama')
                .setPlaceholder('Kategori seç')
                .addOptions([
                    {
                        label: 'Karşılama',
                        value: 'first_option',
                    }
                ]),

        );

    var moderasyonEmbed = new MessageEmbed()
        .setTitle('Moderasyon komutları')
        .addField('Küfür Engelleme', '`!küfür-engel` Sunucudaki küfür içeren mesajları engeller.')
        .addField('Küfür Engelleme', '`!küfür-kapat` Sunucudaki küfür içiren mesajları engellemez.')
        .addField('Link Engelleme', '`!link-engel` Sunucudaki link içeren mesajları engeller.')
        .addField('Link Engelleme', '`!link-kapat` Sunucudaki link içeren mesajları engellemez.')
        .addField('Denetim Kaydı', '`!log #kanalAdı` Sunucu denetim kaydını ayarlanan kanala gönderir.')
        .setFooter('GüneyBOT')
        .setTimestamp()

    var karsilamaEmbed = new MessageEmbed()
    .setTitle('Karşılama komutları')
    .addField('Hoşgeldin','`!hoşgeldin #kanalAdı` Sunucuya yeni bir üye katıldığında ayarlanan kanala mesaj atar.')
    .addField('Gülegüle','`!gülegüle #kanalAdı`Sunucudan bir üye ayrıldığında ayarlanan kanala mesaj atar.')
    .addField('Otomatik Rol','`!otorol @RolAdı`Sunucuya katılan yeni üyeye ayarlanan rolü otomatik olarak verir.')
    .setFooter('GüneyBOT')
    .setTimestamp()



    if (interaction.customId === 'select') {   
        await interaction.update({ embeds: [moderasyonEmbed], components: [moderasyonRow] });
    }

    if (interaction.customId === 'selectModerasyon') {   
        await interaction.update({ embeds: [karsilamaEmbed], components: [karsilamaRow] });
    }
    if (interaction.customId === 'selectKarsilama') {   
        await interaction.update({ embeds: [karsilamaEmbed], components: [karsilamaRow] });
    }

    
})
/* client.on('messageCreate',message => {

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
}) */
client.login(token);