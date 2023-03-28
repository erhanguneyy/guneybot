const prefix = require('../config.json')
const guildDB = require('../db/setting')
module.exports = {
    name: "hosgeldin",
    aliases: ["hoşgeldin"],
    description: "Komut açıklaması",
    usage: "hosgeldin @kanal",
    ownerOnly: false,

    run: async (message,args,client) => {
   
        var hosgeldinKanal = message.mentions.channels.first()
        name = args.shift().toLowerCase();
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            message.channel.send('Üzgünüm bu işlemi gerçekleştirmek için gerekli olan yetkilere sahip değilsiniz.')
            message.delete(3000)
            return;
        }

        else {
            if (hosgeldinKanal) {

                
                const update = await guildDB.findOneAndUpdate({ guildid: message.guild.id }, { hosgeldinKanal }, { new: true })
                return update ? message.channel.send(`Hoşgeldin mesajı ${hosgeldinKanal} adlı kanala atılacak.`) : message.channel.send('Bir hata meydana geldi')


            }
        }
    }


}