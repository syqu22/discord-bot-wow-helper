const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Get info about the WoW helper bot."),
  async execute(interaction) {
    await interaction;
  },
};
