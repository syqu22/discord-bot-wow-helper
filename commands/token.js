const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const readTokenData = async () => {
  return await fs.promises
    .readFile("data/wowtoken-data.json", (err) => {
      if (err) throw err;
    })
    .then((data) => {
      return JSON.parse(data);
    });
};

const customEmbed = async () => {
  const message = new MessageEmbed()
    .setColor("NOT_QUITE_BLACK")
    .setTitle("Gold Tokens");
  const tokenPrices = await readTokenData();
  let index = 1;

  for (const region in tokenPrices.regions) {
    message.addField(
      region.toUpperCase(),
      `**${Number(tokenPrices.regions[region]).toLocaleString()}** Gold`,
      true
    );
    // Add empty field to make embed only have 2 rows
    if (index === 2) message.addField("\u200b", "\u200b");
    index = index + 1;
  }

  message.setFooter({
    text: `Last update on ${new Date(tokenPrices.last_update).toUTCString()}`,
  });

  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("token")
    .setDescription(
      "Shows current price of the WoW token, data is taken from EU, US, KR and TW regions."
    ),
  async execute(interaction) {
    const embed = await customEmbed();
    await interaction.reply({ embeds: [embed] });
  },
};
