const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { logsInfo } = require("../api/logs");

const fightsPerPage = 15;

const customEmbed = (logs, code, page) => {
  const message = new MessageEmbed().setColor("NOT_QUITE_BLACK");
  const logsUrl = `https://www.warcraftlogs.com/reports/${code}`;

  message
    .setTitle(
      `${logs.title} | ${new Date(logs.duration)
        .toISOString()
        .slice(11, -5)} | ${logs?.zone.name}`
    )
    .setURL(logsUrl)
    .setImage(logs.zone?.image);

  const fights = logs.fights.slice(
    page * fightsPerPage,
    page * fightsPerPage + fightsPerPage
  );

  fights.forEach((fight, index) => {
    message.addField(
      `${index + page * fightsPerPage + 1}. ${fight.name} (${
        fight.difficulty
      })`,
      `[Link](${logsUrl}#fight=${fight.id}) | ${new Date(fight.duration)
        .toISOString()
        .slice(14, -5)} | ${fight.bossPercentage}`,
      true
    );
  });

  // Improve embed message spacing with odd amount of elements
  if (fights.length % 3 === 2) {
    message.addField("\u200b", "\u200b", true);
  }
  if (fights.length % 3 === 1) {
    message.addField("\u200b", "\u200b", true);
    message.addField("\u200b", "\u200b", true);
  }

  return message;
};

const paginationRow = () => {
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("primary")
      .setLabel("Previous")
      .setStyle("PRIMARY")
      .setCustomId("previous")
      .setDisabled(true),
    new MessageButton()
      .setCustomId("primary")
      .setLabel("Next")
      .setStyle("PRIMARY")
      .setCustomId("next")
  );

  return row;
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
        .setDescription("Code from WarcraftLogs report.")
        .setRequired(true);
    }),
  async execute(interaction) {
    const code = interaction.options.getString("code");
    const row = paginationRow();
    let page = 0;

    await interaction.deferReply();
    try {
      // Create embed with buttons row
      const logs = await logsInfo(code);
      await interaction.editReply({
        embeds: [customEmbed(logs, code, page)],
        components: logs.fights.length > 15 ? [row] : [], // Don't use pagination with less than 15 fights
      });

      // Handle buttons
      const filter = (i) => i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({
        filter,
      });

      collector.on("collect", async (i) => {
        const maxPages = Math.round(logs.fights.length / fightsPerPage);

        // Pagination logic
        const updatePagination = () => {
          page > 0
            ? row.components[0].setDisabled(false)
            : row.components[0].setDisabled(true);
          page === maxPages
            ? row.components[1].setDisabled(true)
            : row.components[1].setDisabled(false);
        };

        if (i.customId === "next") {
          page = page + 1;
          updatePagination();

          await i.update({
            embeds: [customEmbed(logs, code, page)],
            components: [row],
          });
        }
        if (i.customId === "previous") {
          page = page - 1;
          updatePagination();

          await i.update({
            embeds: [customEmbed(logs, code, page)],
            components: [row],
          });
        }
      });
    } catch {
      await interaction
        .editReply(
          `Cannot find Log with code **${code}**. Make sure the logs are not **Private** and the code is correct.`
        )
        .catch((err) => {
          console.error(err);
        })
        .then((reply) => {
          if (reply) {
            setTimeout(() => {
              reply.delete().catch((err) => {
                console.error(err);
              });
            }, 5000);
          }
        });
    }
  },
};
