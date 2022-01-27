import axios from "axios";
import config from "./config.json";

const BLIZZARD__URL = "https://eu.battle.net/oauth/token";
const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

// Create axios interceptor to connect to Blizzard API retrieve access token
// and  refresh it once expiration
// TODO test if its actually working
const interceptor = axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401) {
      axios.interceptors.response.eject(interceptor);

      return axios
        .post(
          BLIZZARD__URL,
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
          err.response.config.headers[
            "Authorization"
          ] = `Bearer ${data.access_token}`;
          return axios(err.response.config);
        })
        .catch((err) => {
          return Promise.reject(err);
        })
        .finally(interceptor);
    }
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(interceptor);

// Fetch wow token price
export const tokenPrice = async (region) => {
  return await axios
    .get(
      `https://${region}.api.blizzard.com/data/wow/token/index?namespace=dynamic-${region}`
    )
    .then(({ data }) => {
      return data.price / 10000;
    })
    .catch((err) => console.log(err.message));
};

// Destructure character's profile data
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

// Fetch character's profile data
export const characterInfo = async (region, realmSlug, characterName) => {
  return await axios
    .get(
      `https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName}?namespace=profile-${region}`
    )
    .then(({ data }) => {
      return destructureCharacterData(data);
    })
    .catch((err) => console.log(err.message));
};

// Fetch character's profile avatar and return an url of it
// ex. https://render.worldofwarcraft.com/eu/character/xxx/xxx/xxx-inset.jpg
export const characterAvatar = async (region, realmSlug, characterName) => {
  return await axios
    .get(
      `https://${region}.api.blizzard.com/profile/wow/character/${realmSlug}/${characterName}/character-media?namespace=profile-${region}`
    )
    .then(({ data }) => {
      return data.assets[1].value;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
