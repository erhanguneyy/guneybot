const prefix = require('../config.json')
const guildDB = require('../db/setting')
module.exports = {
    name: "log",
    aliases: ["log"],
    description: "Komut açıklaması",
    usage: "log @kanal",
    ownerOnly: false,

    run: async (message,args,client) => {
   
        var logKanal = message.mentions.channels.first()
        name = args.shift().toLowerCase();
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            message.channel.send('Üzgünüm bu işlemi gerçekleştirmek için gerekli olan yetkilere sahip değilsiniz.')
            message.delete(3000)
            return;
        }

        else {
            if (logKanal) {

                
                const update = await guildDB.findOneAndUpdate({ guildid: message.guild.id }, { logKanal }, { new: true })
                return update ? message.channel.send(`Denetim kaydı ${logKanal} adlı kanala atılacak.`) : message.channel.send('Bir hata meydana geldi')


            }
        }
    }


}