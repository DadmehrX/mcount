/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/EvobotUtil");

const client = new Client({ disableMentions: "everyone" });

client.login(process.env.TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 */
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


/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("There was an error executing that command.").catch(console.error);
  }
});
