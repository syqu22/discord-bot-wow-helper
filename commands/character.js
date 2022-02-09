const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { characterInfo } = require("../api/wow");

const customEmbed = async (region, name, realm) => {
  const message = new MessageEmbed().setColor(4433254);
  const character = await characterInfo(region, realm, name);
  const armoryUrl = `https://worldofwarcraft.com/en-gb/character/${region}/${realm}/${name}`;

  name = name.toLowerCase();
  realm = realm.toLowerCase().replace(" ", "-");

  message
    .setTitle(
      `(${character.level}) ${character.name} - ${character.realm} ${
        character.guild ? `<${character.guild}>` : ""
      }`
    )
    .setURL(armoryUrl)
    .setImage(character.image)
    .addField(
      "Spec",
      `${character.race} ${character.spec} ${character.class}`,
      true
    )
    .addField("Faction", `${character.faction}`, true)
    .addField(
      "Item level",
      `(${character.ilvl.avg}) ${character.ilvl.eq}`,
      true
    )
    .addField(
      "Links",
      `[Raider.IO](https://raider.io/characters/${region}/${realm}/${name}) | [WarcraftLogs](https://www.warcraftlogs.com/character/${region}/${realm}/${name}) | [WoWProgress](https://www.wowprogress.com/character/${region}/${realm}/${name})`,
      true
    )
    .addField(
      "Covenant",
      `${character.covenant.name} (${character.covenant.renown})`,
      true
    )
    .addField(
      "Achievements",
      `[${character.achiev_points}](${armoryUrl + "/achievements"})`,
      true
    );

  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("character")
    .setDescription("Shows information about given character.")
    .addStringOption((option) => {
      return option
        .setName("region")
        .setDescription("Select character's region")
        .setRequired(true)
        .addChoices([
          ["EU", "eu"],
          ["NA", "us"],
          ["KR", "kr"],
          ["TW", "tw"],
        ]);
    })
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Insert character's name")
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName("realm")
        .setDescription("Insert character's realm")
        .setRequired(true);
    }),
  async execute(interaction) {
    const region = interaction.options.getString("region");
    const name = interaction.options.getString("name");
    const realm = interaction.options.getString("realm");

    await interaction.deferReply();
    try {
      const embed = await customEmbed(region, name, realm);
      await interaction.editReply({
        embeds: [embed],
      });
    } catch {
      await interaction
        .editReply(
          `Cannot find Character with name **${name}** on realm **${realm}**`
        )
        .then((reply) => setTimeout(() => reply.delete(), 5000));
    }
  },
};
