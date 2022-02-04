const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("character")
    .setDescription(
      "Shows information about given character. Make sure character name and realm."
    )
    .addStringOption((option) => {
      return option
        .setName("region")
        .setDescription("select region")
        .setRequired(true)
        .addChoices([
          ["EU", "eu"],
          ["NA", "us"],
          ["KR", "kr"],
          ["TW", "tw"],
        ]);
    })
    .addStringOption((option) => {
      return option
        .setName("realm")
        .setDescription("select realm")
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("insert character name")
        .setRequired(true);
    }),
  async execute(interaction) {
    await interaction;
  },
};
