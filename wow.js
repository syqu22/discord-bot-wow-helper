import axios from "axios";
import config from "./config.json";

const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

// Connect to Blizzard API to get access token
const BlizzardAPI = async () => {
  try {
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
      });
  } catch (err) {
    console.log(err.message);
  }
};

// Get WoW token from given region
const getWoWToken = async (region) => {
  await BlizzardAPI().then(async (access_token) => {
    await axios
      .get(
        `https://${region}.api.blizzard.com/data/wow/token/index?namespace=dynamic-${region}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data.price / 10000);
      })
      .catch((err) => console.log(err.message));
  });
};

// TODO
const destructureMePlease = ({
  name,
  realm,
  level,
  faction,
  race,
  active_spec,
  character_class,
  average_item_level,
  achievement_points,
  covenant_progress,
  guild,
}) => {};

// Get Character info
const getCharacter = async (region, realmSlug, characterName) => {
  await BlizzardAPI().then(async (access_token) => {
    await axios
      .get(
        `https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName}?namespace=profile-${region}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(({ data }) => {
        // TODO
        destructureMePlease(data);
      })
      .catch((err) => console.log(err.message));
  });
};
