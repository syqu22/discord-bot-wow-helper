import axios from "axios";
import config from "./config.json";

const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

// Connects to Blizzard API and returns access token needed for Authorization
const blizzardAccessToken = async () => {
  let access_token;
  await axios
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
      access_token = data.access_token;
    })
    .catch((err) => console.log(err.message));

  return access_token;
};

// Fetch WoW token price from given region
export const tokenPrice = async (region) => {
  let access_token = await blizzardAccessToken();
  let token;

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
      token = data.price / 10000;
    })
    .catch((err) => console.log(err.message));

  return token;
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

// Fetch Character profile data
export const characterInfo = async (region, realmSlug, characterName) => {
  let access_token = await blizzardAccessToken();
  let character;

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

  return character;
};
