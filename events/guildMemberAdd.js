const Discord = require('discord.js')
const guildDB = require('../db/setting')
module.exports = async(client, member) => {

    const config = await guildDB.findOne({guildid : member.guild.id})
    const otorolid = config.get('otorol')
    const kanalid = config.get('hosgeldinKanal')


    member.roles.add(otorolid);
    client.channels.cache.get(kanalid).send(`:inbox_tray: <@${member.id}> Sunucuya hoşgeldin.`);

}