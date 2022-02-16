const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const readTokenData = async () => {
  return await fs.promises
    .readFile("data/wowtoken-data.json", (err) => {
      if (err) throw err;
    })
    .then((tokens) => {
      return JSON.parse(tokens);
    });
};

const customEmbed = async () => {
  const message = new MessageEmbed()
    .setColor("NOT_QUITE_BLACK")
    .setTitle("WoW token prices");

  const tokenPrices = await readTokenData();
  let index = 0;

  for (const region in tokenPrices.regions) {
    index = index + 1;
    message.addField(
      region.toUpperCase(),
      `**${Number(tokenPrices.regions[region]).toLocaleString()}** Gold`,
      true
    );
    // Add an empty fields to make embed message only have 2 rows
    if (index === 2 || index == 4) message.addField("\u200b", "\u200b", true);
  }
  message
    .setFooter({ text: "Last time updated on" })
    .setTimestamp(new Date(tokenPrices.last_update));

  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("token")
    .setDescription("Shows the current price of the WoW token."),
  async execute(interaction) {
    await interaction.reply({ embeds: [await customEmbed()] });
  },
};
