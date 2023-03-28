const Discord = require("discord.js");


module.exports = async(client) => {

    client.user.setActivity("BAKIMDA", { type: 'STREAMING', url: 'https://www.twitch.tv/erhanguney_'});
/*var oynuyorkısmı = [
`g!yardım - g!help`,
`g!korona - g!corona`,   
`g!davet - g!invite`,
`g!oyver - g!vote - g!website`
];

setInterval(function() {

    var random = Math.floor(Math.random()*(oynuyorkısmı.length-0+1)+0);
   client.user.setActivity(oynuyorkısmı[random], { type: 'STREAMING', url:"https://www.twitch.tv/erhanguney_"});
    }, 2 * 5000);

}

*/
}