const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");
const config = require("./config.json");
const {
  ToadScheduler,
  SimpleIntervalJob,
  AsyncTask,
} = require("toad-scheduler");
const { tokenPrice } = require("./api/wow");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// Load commands data
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Create scheduler with the token task that will run every 30 minutes
const scheduler = new ToadScheduler();
const task = new AsyncTask("simple task", async () => {
  await tokenPrice(), (err) => console.error(err);
});
const job = new SimpleIntervalJob({ minutes: 30 }, task);

client.once("ready", () => {
  client.user.setActivity("/logs", { type: "WATCHING" });
  console.log(`Logged in as ${client.user.tag}`);

  scheduler.addSimpleIntervalJob(job);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(config.token);
