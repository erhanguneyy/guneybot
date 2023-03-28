const guildDB = require('../db/setting')

module.exports = {
    name: "link-engel",
    aliases: ["link-engel"],
    description: "Komut açıklaması",
    usage: "link-engel",
    ownerOnly: false,
    run: async (message,args,client) => {
        
        var linkEngel=message.guild.id
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            message.channel.send('Üzgünüm bu işlemi gerçekleştirmek için gerekli olan yetkilere sahip değilsiniz.')
            message.delete(3000)
            return;
        }
        if(linkEngel){
            const update = await guildDB.findOneAndUpdate({ guildid: message.guild.id }, { linkEngel }, { new: true })
            return update ? message.channel.send(`<@${client.user.id}> artık bu sunucudaki link içeren mesjları silecek.`) : message.channel.send('Bir hata meydana geldi')

        }
    }
}