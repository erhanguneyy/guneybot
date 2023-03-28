const guildDB = require('../db/setting')

module.exports = {
    name: "otorol",
    aliases: ["otorol"],
    description: "Komut açıklaması",
    usage: "otorol @rol",
    ownerOnly: false,
    
    run: async (message,args,client) => {
   
   
        var otorol = message.mentions.roles.first();
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            message.channel.send('Üzgünüm bu işlemi gerçekleştirmek için gerekli olan yetkilere sahip değilsiniz.')
            message.delete(3000)
            return;
        }
        if(otorol){
            const update = await guildDB.findOneAndUpdate({ guildid: message.guild.id }, { otorol }, { new: true })
            return update ? message.channel.send(`Otomatik rol ${otorol} olarak ayarlandı`) : message.channel.send('Bir hata meydana geldi')
        }

    }
}