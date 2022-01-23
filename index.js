const { Client, Intents } = require("discord.js");
const config = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(config.token);
