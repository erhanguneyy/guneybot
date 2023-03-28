const prefix = require('../config.json')
const guildDB = require('../db/setting')
module.exports = {
    name: "gülegüle",
    aliases: ["gulegule"],
    description: "Komut açıklaması",
    usage: "gulegule @kanal",
    ownerOnly: false,

    run: async (message,args,client) => {
   
        var guleguleKanal = message.mentions.channels.first()
        name = args.shift().toLowerCase();
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            message.channel.send('Üzgünüm bu işlemi gerçekleştirmek için gerekli olan yetkilere sahip değilsiniz.')
            message.delete(3000)
            return;
        }

        else {
            if (guleguleKanal) {

                
                const update = await guildDB.findOneAndUpdate({ guildid: message.guild.id }, { guleguleKanal }, { new: true })
                return update ? message.channel.send(`Sunucudan ayrılan kullanıcıların mesajı ${guleguleKanal} adlı kanala atılacak.`) : message.channel.send('Bir hata meydana geldi')


            }
        }
    }


}