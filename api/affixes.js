const data = require("../data/affixes-data.json");

// Calculate how many weeks passed since release of the season
const weeksSinceFirstWeek = () => {
  const timeDifference = new Date() - new Date(data["first_week"]);

  return Math.floor(timeDifference / (1000 * 3600 * 24 * 7) + 1);
};

// Return af fixes for the current week
exports.currentAffixes = () => {
  let week = weeksSinceFirstWeek();
  const currentWeek = week;

  if (week > 12) {
    week %= 12;
  }
  return { week: currentWeek, affixes: data.affixes[week - 1] };
};

// Return affixes for the next week
exports.nextAffixes = () => {
  let week = weeksSinceFirstWeek() + 1;
  const nextWeek = week;

  if (week > 12) {
    week %= 12;
  }
  return { week: nextWeek, affixes: data.affixes[week - 1] };
};

// Return affixes for the previous week
exports.previousAffixes = () => {
  let week = weeksSinceFirstWeek() - 1;
  const previousWeek = week;

  if (week < 1) {
    return { error: "No affixes" };
  } else if (week > 12) {
    week %= 12;

    if (week === 0) {
      week = 12;
    }
  }
  return { week: previousWeek, affixes: data.affixes[week - 1] };
};

// Return affixes for any specific week
exports.affixesFromWeek = (week) => {
  const givenWeek = week;

  if (week < 1) {
    return { error: "No affixes" };
  } else if (week > 12) {
    week %= 12;

    if (week === 0) {
      week = 12;
    }
  }

  return { week: givenWeek, affixes: data.affixes[week - 1] };
};
