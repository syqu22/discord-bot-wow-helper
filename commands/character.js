const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { characterInfo } = require("../api/wow");

const customEmbed = (character) => {
  const message = new MessageEmbed().setColor("NOT_QUITE_BLACK");

  message
    .setTitle(
      `(${character.level}) ${character.name} - ${character.realm} ${
        character.guild ? `<${character.guild}>` : ""
      }`
    )
    .setImage(character.image)
    .addFields(
      {
        name: "Race",
        value: character.race,
        inline: true,
      },
      {
        name: "Class",
        value: character.class,
        inline: true,
      },
      {
        name: "Specialization",
        value: character.spec,
        inline: true,
      },
      { name: "Faction", value: `${character.faction}`, inline: true },
      {
        name: "Item Level",
        value: `**(${character.ilvl.avg})** ${character.ilvl.eq}`,
        inline: true,
      },
      {
        name: "Covenant",
        value: `${character.covenant.name} **(${character.covenant.renown})**`,
        inline: true,
      },
      {
        name: "Achievement points",
        value: `${character.achiev_points}`,
        inline: true,
      }
    );

  return message;
};

const linksRows = (region, realm, name) => {
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("Raider.IO")
      .setStyle("LINK")
      .setURL(`https://raider.io/characters/${region}/${realm}/${name}`),
    new MessageButton()
      .setLabel("WarcraftLogs")
      .setStyle("LINK")
      .setURL(
        `https://www.warcraftlogs.com/character/${region}/${realm}/${name}`
      )
  );

  const row2 = new MessageActionRow().addComponents(
    new MessageButton()
      .setLabel("WowProgress")
      .setStyle("LINK")
      .setURL(
        `https://www.wowprogress.com/character/${region}/${realm}/${name}`
      ),
    new MessageButton()
      .setLabel("Armory")
      .setStyle("LINK")
      .setURL(
        `https://worldofwarcraft.com/en-gb/character/${region}/${realm}/${name}`
      )
  );

  return [row, row2];
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
          "Pass the character's realm, realms composed of two parts should be separated with a space or '-'."
        )
        .setRequired(true);
    }),
  async execute(interaction) {
    const region = interaction.options.getString("region");
    const name = interaction.options.getString("name").trim().toLowerCase();
    const realm = interaction.options
      .getString("realm")
      .trim()
      .toLowerCase()
      .replace(" ", "-");

    await interaction.deferReply();
    try {
      const character = await characterInfo(region, realm, name);
      await interaction.editReply({
        embeds: [customEmbed(character)],
        components: linksRows(region, realm, name),
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
