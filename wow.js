import axios from "axios";
import config from "./config.json";

const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

// Connects to Blizzard API and returns access token needed for Authorization
const blizzardAccessToken = async () => {
  return await axios
    .post(
      `https://eu.battle.net/oauth/token`,
      {},
      {
        params: {
          grant_type: "client_credentials",
          client_id: BLIZZARD_CLIENT,
          client_secret: BLIZZARD_SECRET,
        },
      }
    )
    .then(({ data }) => {
      return data.access_token;
    })
    .catch((err) => console.log(err.message));
};

// Fetch WoW token price from given region
export const tokenPrice = async (region) => {
  let access_token = await blizzardAccessToken();

  return await axios
    .get(
      `https://${region}.api.blizzard.com/data/wow/token/index?namespace=dynamic-${region}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then(({ data }) => {
      return data.price / 10000;
    })
    .catch((err) => console.log(err.message));
};

// Destructure important data from a character
const destructureCharacterData = (character) => {
  const {
    name,
    realm,
    level,
    faction,
    guild,
    character_class,
    race,
    covenant_progress,
    active_spec,
    average_item_level,
    achievement_points,
  } = character;

  return {
    name: name,
    realm: realm.name.en_GB,
    level: level,
    faction: faction.name.en_GB,
    guild: guild.name,
    class: character_class.name.en_GB,
    race: race.name.en_GB,
    covenant: {
      name: covenant_progress.chosen_covenant.name.en_GB,
      renown: covenant_progress.renown_level,
    },
    spec: active_spec.name.en_GB,
    ilvl: average_item_level,
    achiev_points: achievement_points,
  };
};

// Fetch Character profile data
export const characterInfo = async (region, realmSlug, characterName) => {
  let access_token = await blizzardAccessToken();

  return await axios
    .get(
      `https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName}?namespace=profile-${region}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then(({ data }) => {
      return destructureCharacterData(data);
    })
    .catch((err) => console.log(err.message));
};
