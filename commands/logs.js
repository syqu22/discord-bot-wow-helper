const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("log")
    .setDescription(
      "Shows fights from WarcraftLogs log as a list with clickable link to each fight."
    )
    .addStringOption((option) => {
      return option
        .setName("code")
        .setDescription("Code from WarcraftLogs")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction;
  },
};
