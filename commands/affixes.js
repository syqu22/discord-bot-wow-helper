const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const {
  currentAffixes,
  nextAffixes,
  previousAffixes,
  affixesFromWeek,
} = require("../api/affixes.js");

const customEmbed = async (weekNum = null) => {
  const message = new MessageEmbed()
    .setColor("NOT_QUITE_BLACK")
    .setTitle("Mythic+ affixes");

  if (weekNum) {
    const exact = affixesFromWeek(weekNum);
    message.addField(`Week ${exact.week}:`, exact.affixes.join(", "));
  } else {
    const previous = previousAffixes();
    const current = currentAffixes();
    const next = nextAffixes();

    // During the first week of the season don't show previous week affixes
    if (!previous.error) {
      message.addField(
        `Previous week ${previous.week}:`,
        previous.affixes.join(", "),
        true
      );
    }
    message.addFields(
      {
        name: `Current week ${current.week}:`,
        value: current.affixes.join(", "),
        inline: true,
      },
      {
        name: `Next week ${next.week}:`,
        value: next.affixes.join(", "),
        inline: true,
      }
    );
  }
  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("affixes")
    .setDescription(
      "Get a list of affixes for previous, current and next week. Can also show affixes for any given week."
    )
    .addIntegerOption((option) => {
      return option
        .setName("week")
        .setDescription("Wweek you want to see the affixes for.");
    }),
  async execute(interaction) {
    const week = interaction.options.getInteger("week");

    await interaction.reply({ embeds: [await customEmbed(week)] });
  },
};
