const Discord = require("discord.js");
const config = require("./config.json");
let client = new Discord.Client(),

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


});


