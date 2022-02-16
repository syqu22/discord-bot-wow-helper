const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const VOTE_URL = "https://top.gg/bot/842687783523844149/vote";
const IMAGE_URL =
  "https://raw.githubusercontent.com/syqu22/discord-bot-wow-helper/main/img/avatar.png";

const customEmbed = () => {
  const message = new MessageEmbed().setColor("NOT_QUITE_BLACK");

  message
    .setTitle("Vote for this bot!")
    .addField("Top.gg", `[Vote](${VOTE_URL})`)
    .setThumbnail(IMAGE_URL);

  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Support the bot by voting for it."),
  async execute(interaction) {
    await interaction.reply({ embeds: [customEmbed()] });
  },
};
