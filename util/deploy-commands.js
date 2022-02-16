const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("../config.json");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const clientId = config.discord_client;

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(config.discord_token);

(async () => {
  try {
    console.log("Updating commands...");
    await rest
      .put(Routes.applicationCommands(clientId), {
        body: commands,
      })
      .then(() => console.log("Commands successfully updated."));
  } catch (err) {
    console.error(err);
  }
})();
