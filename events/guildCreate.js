const Discord = require("discord.js");
const guildDB =  require('../db/setting')

module.exports = async(client, guild) => {

    guildDB.create({guildid: guild.id})
}