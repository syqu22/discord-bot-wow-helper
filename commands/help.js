const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { inlineCode } = require("@discordjs/builders");

const customEmbed = () => {
  const message = new MessageEmbed()
    .setColor("NOT_QUITE_BLACK")
    .setTitle("List of all commands");

  message.addFields(
    {
      name: inlineCode("/logs"),
      value:
        "Shows fights from WarcraftLogs log as a list with clickable link to each fight. Additionally it's also showing the health of boss and combat duration.",
    },
    {
      name: inlineCode("/token"),
      value: "TODO",
    },
    {
      name: inlineCode("/character"),
      value: "TODO",
    },
    {
      name: inlineCode("/affixes"),
      value: "TODO",
    },
    {
      name: inlineCode("/about"),
      value: "TODO",
    },
    {
      name: inlineCode("/vote"),
      value: "TODO",
    },
    {
      name: inlineCode("/help"),
      value: "TODO",
    }
  );

  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Get help for all the commands."),
  async execute(interaction) {
    await interaction.reply({ embeds: [customEmbed()] });
  },
};
