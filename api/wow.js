const fs = require("fs");
const axios = require("axios");
const config = require("../config.json");

// Set global variables for Blizzard API
const BLIZZARD_URL = "https://eu.battle.net/oauth/token";
const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

// Create axios instance to retrieve access token from LocalStorage
const connection = axios.create();

// Create axios interceptor that on Authorization will refresh the access token
connection.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // If current token is expired/wrong remove it from headers
    if (err.response.data.error === "invalid_token") {
      delete connection.defaults.headers["Authorization"];
      delete err.response.config.headers["Authorization"];
    }

    // On authorization error when no token is set
    if (err.response.status === 401) {
      return connection
        .post(
          BLIZZARD_URL,
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
          connection.defaults.headers[
            "Authorization"
          ] = `Bearer ${data.access_token}`;
          err.response.config.headers[
            "Authorization"
          ] = `Bearer ${data.access_token}`;
          return connection(err.response.config);
        })
        .catch((err) => Promise.reject(err));
    }
    return Promise.reject(err);
  }
);

// Fetch wow token price from all regions and save it to a JSON file
exports.tokenPrice = async () => {
  const regions = ["eu", "us", "kr", "tw"];
  const tokens = { regions: {}, last_update: 0 };

  for (const region of regions) {
    await connection
      .get(
        `https://${region}.api.blizzard.com/data/wow/token/index?namespace=dynamic-${region}`
      )
      .then(({ data }) => {
        tokens.regions[region] = data.price / 10000;
      })
      .finally(() => {
        tokens.last_update = new Date().getTime();
      })
      .catch((err) => Promise.reject(err));
  }
  // Save token data as JSON file
  await fs.promises.writeFile(
    "data/wowtoken-data.json",
    JSON.stringify(tokens),
    (err) => {
      if (err) throw err;
    }
  );
};

// Fetch character's profile avatar and return an url of it
// ex. https://render.worldofwarcraft.com/eu/character/xxx/xxx/xxx-inset.jpg
const characterAvatar = async (region, realmSlug, characterName) => {
  return await connection
    .get(
      `https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName}/character-media?namespace=profile-${region}`
    )
    .then(({ data }) => {
      return data.assets[1].value;
    })
    .catch((err) => Promise.reject(err));
};

// Destructure character's profile data
const character = async (data, info) => {
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
    equipped_item_level,
    achievement_points,
  } = data;

  return {
    name: name,
    realm: realm.name.en_GB,
    level: level,
    faction: faction?.name.en_GB,
    guild: guild?.name,
    class: character_class?.name.en_GB,
    race: race.name.en_GB,
    covenant: {
      name: covenant_progress?.chosen_covenant.name.en_GB,
      renown: covenant_progress?.renown_level,
    },
    spec: active_spec?.name.en_GB,
    ilvl: {
      avg: average_item_level,
      eq: equipped_item_level,
    },
    achiev_points: achievement_points,
    image: await characterAvatar(
      info.region,
      info.realmSlug,
      info.characterName
    ),
  };
};

// Fetch character's profile data
exports.characterInfo = async (region, realmSlug, characterName) => {
  return await connection
    .get(
      `https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName}?namespace=profile-${region}`
    )
    .then(({ data }) => {
      return character(data, {
        region,
        realmSlug,
        characterName,
      });
    })
    .catch((err) => Promise.reject(err));
};
