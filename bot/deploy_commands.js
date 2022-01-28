const SlashCommandBuilder = require("@discordjs/builders");
const REST = require("@discordjs/rest");
const Routes = require("discord-api-types/v9");
const config = require("../config.json");

// For testing
const clientId = "934929013238034442";
const guildId = "842688263445282817";

const commands = [
  new SlashCommandBuilder()
    .setName("log")
    .setDescription(
      "Shows fights from WarcraftLogs log as a list with clickable link to each fight."
    ),
  new SlashCommandBuilder()
    .setName("affixes")
    .setDescription(
      "Shows affixes for previous/current/next week. Can also show affixes for the week user wants."
    ),
  new SlashCommandBuilder()
    .setName("token")
    .setDescription(
      "Shows current price of the WoW token, data is taken from EU, US, KR, TW and CN regions."
    ),
  new SlashCommandBuilder()
    .setName("character")
    .setDescription(
      "Shows information about given character. Make sure character name and realm."
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(config.token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Commands successfully updated."))
  .catch(console.error);
