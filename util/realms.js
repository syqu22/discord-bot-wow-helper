const fs = require("fs");
const axios = require("axios");
const config = require("../config.json");

const BLIZZARD_URL = "https://eu.battle.net/oauth/token";
const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

const regions = ["eu", "us", "kr", "tw"];
const realms = [];

(async () => {
  try {
    console.log("Updating realms data...");
    await axios
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
      .then(async ({ data }) => {
        for (const region of regions) {
          await axios
            .get(
              `https://${region}.api.blizzard.com/data/wow/realm/index?namespace=dynamic-${region}`,
              { headers: { Authorization: `Bearer ${data.access_token}` } }
            )
            .then(({ data }) => {
              data.realms.forEach((realm) => {
                realms.push({ name: realm.name.en_GB, slug: realm.slug });
              });
            });
        }
      })
      .then(async () => {
        await fs.promises.writeFile(
          "data/realms-data.json",
          JSON.stringify(realms)
        ),
          (err) => {
            if (err) throw err;
          };
      })
      .then(() => console.log("Realms data successfully updated."));
  } catch (err) {
    console.error(err);
  }
})();
