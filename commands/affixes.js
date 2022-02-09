const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const {
  currentAffixes,
  nextAffixes,
  previousAffixes,
  affixesFromWeek,
} = require("../api/affixes.js");

const customEmbed = (weekNum) => {
  const message = new MessageEmbed().setColor(2075661).setTitle("Affixes");

  if (weekNum) {
    const exact = affixesFromWeek(weekNum);
    message.addField(`Week ${exact.week}:`, exact.affixes.join(", "));
  } else {
    const previous = previousAffixes();
    const current = currentAffixes();
    const next = nextAffixes();

    // During first week don't show previous week affixes
    if (!previous.error) {
      message.addField(
        `Previous week ${previous.week}:`,
        previous.affixes.join(", "),
        true
      );
    }
    message
      .addField(
        `Current week ${current.week}:`,
        current.affixes.join(", "),
        true
      )
      .addField(`Next week ${next.week}:`, next.affixes.join(", "), true);
  }
  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affixes")
    .setDescription(
      "Shows affixes for previous/current/next week. Can also show affixes for the week user wants."
    )
    .addIntegerOption((option) => {
      return option
        .setName("week")
        .setDescription("The week you want to see affixes for");
    }),
  async execute(interaction) {
    const week = interaction.options.getInteger("week");

    interaction.reply({ embeds: [customEmbed(week)] });
  },
};
