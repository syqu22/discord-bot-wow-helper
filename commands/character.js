const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { characterInfo } = require("../api/wow");

const customEmbed = async (region, name, realm) => {
  const message = new MessageEmbed().setColor("NOT_QUITE_BLACK");
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
    .addFields(
      {
        name: "Spec",
        value: `${character.race} ${character.spec} ${character.class}`,
        inline: true,
      },
      { name: "Faction", value: `${character.faction}`, inline: true },
      {
        name: "Item level",
        value: `(${character.ilvl.avg}) ${character.ilvl.eq}`,
        inline: true,
      },
      {
        name: "Links",
        value: `[Raider.IO](https://raider.io/characters/${region}/${realm}/${name}) | [WarcraftLogs](https://www.warcraftlogs.com/character/${region}/${realm}/${name}) | [WoWProgress](https://www.wowprogress.com/character/${region}/${realm}/${name})`,
        inline: true,
      },
      {
        name: "Covenant",
        value: `${character.covenant.name} (${character.covenant.renown})`,
        inline: true,
      },
      {
        name: "Achievements",
        value: `[${character.achiev_points}](${armoryUrl + "/achievements"})`,
        inline: true,
      }
    );

  return message;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("character")
    .setDescription("Shows information about the given character.")
    .addStringOption((option) => {
      return option
        .setName("region")
        .setDescription("Select the character's region.")
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
        .setDescription("Insert the character's name.")
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName("realm")
        .setDescription(
          "Pass the character's realm (realms composed of two parts should be separated with a space or '-')."
        )
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
          `Cannot find the character with name **${name}** on realm **${realm}**.`
        )
        .then((reply) => setTimeout(() => reply.delete(), 5000));
    }
  },
};
