const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const VOTE_URL = "TODO";

const customEmbed = () => {
  const message = new MessageEmbed().setColor("NOT_QUITE_BLACK");

  message.setTitle("Vote for this bot!").addField("TODO", VOTE_URL);

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
