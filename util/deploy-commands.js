const fs = require("fs");
require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Updating commands...");
    await rest
      .put(Routes.applicationCommands(process.env.DISCORD_CLIENT), {
        body: commands,
      })
      .then(() => console.log("Commands successfully updated."));
  } catch (err) {
    console.error(err);
  }
})();
