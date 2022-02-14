const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { logsInfo } = require("../api/logs");

const customEmbed = async (code) => {
  const message = new MessageEmbed().setColor("NOT_QUITE_BLACK");
  const logsUrl = `https://www.warcraftlogs.com/reports/${code}`;
  const logs = await logsInfo(code);

  message
    .setTitle(
      `${logs.title} | ${new Date(logs.duration)
        .toISOString()
        .slice(11, -5)} | ${logs?.zone.name}`
    )
    .setURL(logsUrl)
    .setImage(logs.zone?.image);

  logs.fights.forEach((fight, index) => {
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

const paginationRow = (page) => {
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("primary")
      .setLabel("Previous")
      .setStyle("PRIMARY")
      .setCustomId("previous"),
    new MessageButton()
      .setCustomId("primary")
      .setLabel("Next")
      .setStyle("PRIMARY")
      .setCustomId("next")
  );

  return row;
};

const handleButtons = (interaction) => {
  const filter = (i) => i.user.id === interaction.user.id;
  const collector = interaction.channel.createMessageComponentCollector({
    filter,
    time: 15000,
  });

  collector.on("collect", async (i) => {
    await i.update("");
  });

  collector.on("end", async (i) => {
    await i.update("");
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("logs")
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
    const row = paginationRow(0);

    await interaction.deferReply();
    try {
      const embed = await customEmbed(code);
      await interaction.editReply({ embeds: [embed], components: [row] });
      handleButtons(interaction);
    } catch {
      await interaction
        .editReply(
          `Cannot find Log with code **${code}**. Make sure the logs are not **Private** and the code is correct.`
        )
        .then((reply) => setTimeout(() => reply.delete(), 5000));
    }
  },
};
