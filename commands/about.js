const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const GITHUB_URL = "https://github.com/syqu22/discord-bot-wow-helper-js";
const ISSUES_URL =
  "https://github.com/syqu22/discord-bot-wow-helper-js/issues/new";
const CONTACT_DISCORD = "Syqu#2458";
const CONTACT_EMAIL = "aleklejawa@gmail.com";
const IMAGE_URL =
  "https://raw.githubusercontent.com/syqu22/discord-bot-wow-helper-js/main/img/avatar.png";

const customEmbed = () => {
  const message = new MessageEmbed()
    .setColor("NOT_QUITE_BLACK")
    .setTitle("About me!");

  message
    .setDescription(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
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
