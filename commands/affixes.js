const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  body: new SlashCommandBuilder(),
  async execute(interaction) {
    await interaction;
  },
};
