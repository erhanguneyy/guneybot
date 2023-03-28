const mongoose = require ('mongoose')

const Config = mongoose.Schema( {
    guildid:{
        type: String,
        required: true,
        uniqe: true
    },
    prefix:{
        type: String,
        required:true,
        default:"!"
    },
    otorol:{
        type: String,
        required:true,
        default:"roleId"
    },
    hosgeldinKanal:{
        type:String,
        required:true,
        default:"channelId"
    },
    komutlar:{
        type:Array,
        required:true,
        uniqe:true
    },
    guleguleKanal:{
        type:String,
        required:true,
        default:"channelId"
    },
    sayac:{
        type:String,
        required:true,
        default:"0"
    },
    sayacKanal:{
        type:String,
        required:true,
        default:"channelId"
    },
    kufurEngel:{
        type:String,
        required:true,
        default:"channelId"
    },
    linkEngel:{
        type:String,
        required:true,
        default:"channelId"
    },
    logKanal:{
        type:String,
        required:true,
        default:"channelId"
    },
    kayıtKanal:{
        type:String,
        required:true,
        default:"channelId"
    },
    kayıtRol:{
        type:String,
        required:true,
        default:"roleId"
    }
    
})

module.exports = mongoose.model('setting', Config)