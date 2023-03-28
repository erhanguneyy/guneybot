const Discord = require('discord.js')
const guildDB = require('../db/setting')
module.exports = async(client, member) => {


    const config = await guildDB.findOne({guildid : member.guild.id})
    const kanalid = config.get('guleguleKanal')

    client.channels.cache.get(kanalid).send(`:outbox_tray: <@${member.id}> Sunucudan ayrıldı.`);



}