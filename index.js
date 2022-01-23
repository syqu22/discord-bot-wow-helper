const { Client, Intents } = require("discord.js");
const { token } = require("./config.json");
const affixes = require("./affixes");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;

  if (commandName === "log") {
    await interaction.reply("log");
  } else if (commandName === "affixes") {
    await interaction.reply("affixes");
  } else if (commandName === "token") {
    await interaction.reply("token");
  } else if (commandName === "character") {
    await interaction.reply("character");
  }
});
console.log(affixes.currentAffixes());
client.login(token);
