const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { inlineCode } = require("@discordjs/builders");

const customEmbed = () => {
  const message = new MessageEmbed()
    .setColor("NOT_QUITE_BLACK")
    .setTitle("List of commands");

  message.addFields(
    {
      name: inlineCode("/logs"),
      value:
        "Shows fights from WarcraftLogs log as a list with clickable link to each fight. Additionally it's showing the health of bosses and duration of fights.\n\nParameters:  \n**code** - random characters generated after the link to your logs, ex. www.warcraftlogs.com/reports/__4C9Kfp6Ht7MQkhXd__",
    },
    {
      name: inlineCode("/character"),
      value:
        "Shows a panel with various character's information like the current race, specialization, guild etc. Also provides links to some most populars websites you can check your character on.\n\nParameters:\n**region**\n**name**\n**realm**",
    },
    {
      name: inlineCode("/token"),
      value:
        "Shows a list of current WoW token prices in EU, US, KR and TW regions with an updated list every 30 minutes.",
    },
    {
      name: inlineCode("/affixes"),
      value:
        "Shows a list of affixes from current, previous and the incoming week with addition to showing the number of week.\n\nParameters:\n(_optional_) **week** - the exact week you wan to know affixes for.",
    },
    {
      name: inlineCode("/about"),
      value: "Shows some information about the bot with the contact details.",
    },
    {
      name: inlineCode("/vote"),
      value: "Shows a list of pages where you can vote for the bot.",
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
