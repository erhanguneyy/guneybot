
module.exports = {
    name: "test",
    aliases: ["test"],
    description: "Komut açıklaması",
    usage: "kullanımı",
    ownerOnly: false,
    //Komutun herkese açık mı,
    //ya da sadece geliştiricilere özel mi olduğunu belirtirsiniz.
    run: async (message,args,client) => {
   
   message.channel.send("Bu bir test mesajıdır.")
    }
}