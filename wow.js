import axios from "axios";
import config from "./config.json";

const BLIZZARD_CLIENT = config.blizzard_client;
const BLIZZARD_SECRET = config.blizzard_secret;

const retrieveToken = async () => {
  return await axios
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
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
