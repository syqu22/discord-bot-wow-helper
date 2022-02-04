const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affixes")
    .setDescription(
      "Shows affixes for previous/current/next week. Can also show affixes for the week user wants."
    )
    .addSubcommand((sub) => {
      return sub
        .setName("now")
        .setDescription("Shows affixes for current week");
    })
    .addSubcommand((sub) => {
      return sub.setName("next").setDescription("Shows affixes for next week");
    })
    .addSubcommand((sub) => {
      return sub
        .setName("previous")
        .setDescription("Shows affixes for previous week");
    })
    .addSubcommand((sub) => {
      return sub
        .setName("exact")
        .setDescription("Shows affixes for given week")
        .addIntegerOption((option) => {
          return option
            .setName("week")
            .setDescription("given week")
            .setRequired(true);
        });
    }),
  async execute(interaction) {
    await interaction;
  },
};
