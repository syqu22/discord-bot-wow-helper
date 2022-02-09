const axios = require("axios");
const config = require("../config.json");

const API_URL = "https://www.warcraftlogs.com:443/v1/report/";
const API_KEY = config.warcraftlogs_client;

// Fetch logs JSON data from Warcraftlogs API
const fetchLogs = async (code) => {
  return await axios
    .get(API_URL + "fights/" + code, {
      params: {
        api_key: API_KEY,
        translate: "True",
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// Change zone id to the appropriate zone name
const zoneName = (zoneId) => {
  switch (zoneId) {
    case 25:
      return "Mythic+";
    case 26:
      return "Castle Nathria";
    case 27:
      return "Torghast";
    case 28:
      return "Sanctum of Domination";
    case 29:
      return "Sepulcher of the First Ones";
    case 30:
      return "Future raid...";
    default:
      break;
  }
};

// Parse data of a single fight
const fightDetail = (fights) => {
  const parsedFights = [];

  // Change fight difficulty id to the appropriate difficulty name
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
        break;
    }
  };

  // Change boss health depending on his health percentage
  const bossHealth = (kill, bossPercentage) => {
    if (kill) {
      return "Defeated";
    } else {
      return `${bossPercentage / 100}%`;
    }
  };

  // Do the destructuring for each fight
  fights.forEach(
    ({
      boss,
      name,
      difficulty,
      start_time,
      end_time,
      bossPercentage,
      kill,
    }) => {
      // Skip trash
      if (boss) {
        parsedFights.push({
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
exports.logInfo = async (code) => {
  const logs = await fetchLogs(code);
  const fights = fightDetail(logs.fights);

  return {
    title: logs.title,
    fights: fights,
    duration: Math.abs(logs.start - logs.end),
    zone: zoneName(logs.zone),
  };
};
