const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Support the bot by voting for it."),
  async execute(interaction) {
    await interaction;
  },
};
