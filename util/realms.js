const fs = require("fs");
require("dotenv").config();
const axios = require("axios");
const config = require("../config.json");

const BLIZZARD_URL = "https://eu.battle.net/oauth/token";
const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

const realms = { eu: [], us: [], kr: [], tw: [] };

(async () => {
  // Retrieve Blizzard API's access token
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
      // Using the token fetch realms data info
      .then(async ({ data }) => {
        for (const region in realms) {
          await axios
            .get(
              `https://${region}.api.blizzard.com/data/wow/realm/index?namespace=dynamic-${region}`,
              { headers: { Authorization: `Bearer ${data.access_token}` } }
            )
            .then(({ data }) => {
              data.realms.forEach((realm) => {
                realms[region].push({
                  name: realm.name.en_GB,
                  slug: realm.slug,
                });
              });
            });
        }
      })
      // Save the data into a JSON file
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
