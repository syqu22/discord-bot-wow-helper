const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");

const readTokenData = async () => {
  await fs.promises.readFile("./data/wowtoken-data.json", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("token")
    .setDescription(
      "Shows current price of the WoW token, data is taken from EU, US, KR, TW and CN regions."
    ),
  async execute(interaction) {
    await interaction;
  },
};
