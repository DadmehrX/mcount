 const Discord = require("discord.js");
const config = require("./config.json");
let client = new Discord.Client(),

module.exports = {
  name: "play",
  cooldown: 3,
  aliases: ["p"],
  description: "Plays audio from YouTube or Soundcloud",



client.on("message", message => {
  if (message.content.startsWith(prefix)) {
    let args = message.content.slice(prefix.length).split(" "),
      cmd = args.shift();

    if (cmd === "help") {
      message.author.send("لطفا منتظر بمانید تا ادمین مربوطه رسیدگی کند");
      client.channels.cache.get("793047078271057940").send("<@&792190596185194536> 1 Darkhast Baraye Residegi Dari <#792190789240487947>");
    }
    if (cmd === "new") {
      client.channels.cache
        .get("792192338968444969")
        .send("لطفا در ویس چنل منتظر بمانید");
      client.channels.cache
        .get("793020699437826048")
        .send("@here Member Jadid Omade <#792192338968444969>");
    }
  }
});



var used1 = false;
client.on('ready', () => {
    console.log('On ShoD ');
    client.user.setStatus('online').catch(console.error);
    setInterval(() => {
      let membersCount = client.guilds.cache.map(guild => guild.memberCount).reduce((a, b) => a + b, 0)
      var guild = client.guilds.cache.get('724360597038301199')
      var onlineCount = guild.members.cache.filter(m => m.presence.status === 'online').size 
        if(used1){
          client.user.setActivity(`تعداد کاربران : ${membersCount}`,{
          type: 'LISTENING'
/*           url: 'https://www.twitch.tv/XXX', */
          });
        used1 = false;}
      else{
         client.user.setActivity("Welcome To Divinity=))",{
        type: "LISTENING"
        });
        used1 = true;}
    }, 25000);

});


