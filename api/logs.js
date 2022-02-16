const axios = require("axios");

const API_URL = "https://www.warcraftlogs.com:443/v1/report/";

// Fetch the logs JSON data from Warcraftlogs API
const fetchLogs = async (code) => {
  return await axios
    .get(API_URL + "fights/" + code, {
      params: {
        api_key: process.env.WARCRAFTLOGS_CLIENT,
        translate: "True",
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.error(err.response.data);
    });
};

// Change the zone id to the appropriate zone name
const zone = (zoneId) => {
  switch (zoneId) {
    case 25:
      return { name: "Mythic+", image: "https://i.imgur.com/VT7yTYl.jpg" };
    case 26:
      return {
        name: "Castle Nathria",
        image: "https://i.imgur.com/cssCW3A.jpg",
      };
    case 27:
      return { name: "Torghast", image: "https://i.imgur.com/a3Kzwws.jpg" };
    case 28:
      return {
        name: "Sanctum of Domination",
        image: "https://i.imgur.com/X5Kk2JO.jpg",
      };
    case 29:
      return {
        name: "Sepulcher of the First Ones",
        image: "https://i.imgur.com/knJecHj.png",
      };
    default:
      break;
  }
};

// Parse the fight's data and return list with each of the fights
const fightDetail = (fights) => {
  const parsedFights = [];

  // Change the fight difficulty ID to an appropriate name
  const fightDifficulty = (difficulty) => {
    switch (difficulty) {
      case 20:
        return "Torghast";
      case 10:
        return "Mythic+";
      case 5:
        return "Mythic";
      case 4:
        return "Heroic";
      case 3:
        return "Normal";
      case 1:
        return "LFR";
      default:
        return "Unknown Difficulty";
    }
  };

  // Change the boss health depending on his health percentage
  const bossHealth = (kill, bossPercentage) => {
    if (kill) {
      return "Defeated!";
    } else {
      return `${bossPercentage / 100}%`;
    }
  };

  // Do the destructuring for each fight
  fights.forEach(
    ({
      id,
      boss,
      name,
      difficulty,
      start_time,
      end_time,
      bossPercentage,
      kill,
    }) => {
      // Skip trash fights
      if (boss) {
        parsedFights.push({
          id: id,
          boss: boss,
          name: name,
          difficulty: fightDifficulty(difficulty),
          duration: Math.abs(start_time - end_time),
          bossPercentage: bossHealth(kill, bossPercentage),
        });
      }
    }
  );

  return parsedFights;
};

// Return an object with all parsed data
exports.logsInfo = async (code) => {
  const logs = await fetchLogs(code);
  const fights = fightDetail(logs.fights);

  return {
    title: logs.title,
    fights: fights,
    duration: Math.abs(logs.start - logs.end),
    zone: zone(logs.zone),
  };
};
