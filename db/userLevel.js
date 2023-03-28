const mongoose = require ('mongoose')

const LevelS = mongoose.Schema( {
    userId:{
        type: String,
        required:true,
        uniqe: true
    },
    guildId:{
        type: String,
        required:true,
        default:"guildId"
    },
    userXp:{
        type: String,
        required:true,
        default: "0"
    },
    userLevel:{
        type: String,
        required:true,
        default: "1"
    }
})

module.exports = mongoose.model('userLevel', LevelS)