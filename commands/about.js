const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const GITHUB_URL = "https://github.com/syqu22/discord-bot-wow-helper-js";
const ISSUES_URL =
  "https://github.com/syqu22/discord-bot-wow-helper-js/issues/new";
const CONTACT_DISCORD = "Syqu#2458";
const CONTACT_EMAIL = "aleklejawa@gmail.com";
const IMAGE_URL =
  "https://raw.githubusercontent.com/syqu22/discord-bot-wow-helper/main/img/avatar.png";

const customEmbed = () => {
  const message = new MessageEmbed()
    .setColor("NOT_QUITE_BLACK")
    .setTitle("About me!");

  message
    .setDescription(
      "Nice to see you here! This bot was created some time ago, now it got updated for new discord slash commands. Everything got much cleaner and took a bit more work. Feel free to contact me regarding anything about it."
    )
    .setThumbnail(IMAGE_URL);

  message.addFields(
    {
      name: "Report a bug",
      value: `[Link](${ISSUES_URL})`,
      inline: true,
    },
    {
      name: "GitHub",
      value: `[Link](${GITHUB_URL})`,
      inline: true,
    },
    {
      name: "Contact",
      value: `Discord: __${CONTACT_DISCORD}__ \n E-Mail: __${CONTACT_EMAIL}__`,
      inline: true,
    }
  );

  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Get info about the WoW helper bot."),
  async execute(interaction) {
    await interaction.reply({ embeds: [customEmbed()] });
  },
};
