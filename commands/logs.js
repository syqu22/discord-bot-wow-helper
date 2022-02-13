const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { logInfo } = require("../api/logs");

const customEmbed = async (code) => {
  const message = new MessageEmbed().setColor("NOT_QUITE_BLACK");
  const log = await logInfo(code);
  const logsUrl = `https://www.warcraftlogs.com/reports/${code}`;

  message
    .setTitle(
      `${log.title} | ${new Date(log.duration).toISOString().slice(11, -5)} | ${
        log?.zone.name
      }`
    )
    .setURL(logsUrl)
    .setImage(log.zone?.image);

  log.fights.forEach((fight, index) => {
    message.addField(
      `${index + 1}. ${fight.name} (${fight.difficulty})`,
      `[Link](${logsUrl}#fight=${fight.id}) | ${new Date(fight.duration)
        .toISOString()
        .slice(14, -5)} | ${fight.bossPercentage}`,
      true
    );
  });

  return message;
};

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
    const code = interaction.options.getString("code");

    await interaction.deferReply();
    try {
      const embed = await customEmbed(code);
      await interaction.editReply({ embeds: [embed] });
    } catch {
      await interaction
        .editReply(
          `Cannot find Log with code **${code}**. Make sure the logs are not **Private** and the code is correct.`
        )
        .then((reply) => setTimeout(() => reply.delete(), 5000));
    }
  },
};
