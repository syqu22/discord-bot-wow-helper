import axios from "axios";
import config from "./config.json";

const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

const getAPIConnection = async () => {
  try {
    await axios
      .post(
        "https://us.battle.net/oauth/token",
        {},
        {
          params: {
            grant_type: "client_credentials",
            client_id: BLIZZARD_CLIENT,
            client_secret: BLIZZARD_SECRET,
          },
        }
      )
      .then(async (res) => {
        await axios
          .get(
            "https://us.api.blizzard.com/data/wow/token/index?namespace=dynamic-us",

            {
              headers: {
                Authorization: `Bearer ${res.data.access_token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
          });
      });
  } catch (err) {
    console.log(err.message);
  }
};

getAPIConnection();
