const guildDB = require('../db/setting')

module.exports = {
    name: "küfür-kapat",
    aliases: ["kufur-kapat"],
    description: "Komut açıklaması",
    usage: "kufur-engel",
    ownerOnly: false,
    run: async (message,args,client) => {
        
        var kufurEngel="false"
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            message.channel.send('Üzgünüm bu işlemi gerçekleştirmek için gerekli olan yetkilere sahip değilsiniz.')
            message.delete(3000)
            return;
        }
        if(kufurEngel){
            const update = await guildDB.findOneAndUpdate({ guildid: message.guild.id }, { kufurEngel }, { new: true })
            return update ? message.channel.send(`<@${client.user.id}> artık bu sunucudaki küfür içeren mesjları silmeyecek.`) : message.channel.send('Bir hata meydana geldi')

        }
    }
}