const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("./config.json");

const commands = [];
// Read commands from "/commands" folder
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// For testing
// TODO
const clientId = config.client;
const guildId = "842688263445282817";

// Load commands data
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(config.token);

(async () => {
  try {
    console.log("Updating commands...");
    await rest
      .put(Routes.applicationGuildCommands(clientId, guildId), {
        body: commands,
      })
      .then(() => console.log("Commands successfully updated."));
  } catch (err) {
    console.error(err);
  }
})();
