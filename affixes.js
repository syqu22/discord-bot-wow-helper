const data = require("./affixes.json");

const weeksSinceFirstWeek = () => {
  const timeDifference = new Date() - new Date(data["first_week"]);

  return Math.floor(timeDifference / (1000 * 3600 * 24 * 7) + 1);
};

const currentAffixes = () => {
  let week = weeksSinceFirstWeek();
  const currentWeek = week;

  while (week > 12) {
    week -= 12;
  }
  return { week: currentWeek, affixes: data.affixes[week - 1] };
};

const nextAffixes = () => {
  let week = weeksSinceFirstWeek() + 1;
  const nextWeek = week;

  while (week > 12) {
    week -= 12;
  }
  return { week: nextWeek, affixes: data.affixes[week - 1] };
};

const previousAffixes = () => {
  let week = weeksSinceFirstWeek() - 1;
  const previousWeek = week;

  if (week < 1) {
    return { error: "No affixes" };
  }

  while (week > 12) {
    week -= 12;
  }
  return { week: previousWeek, affixes: data.affixes[week - 1] };
};

const affixesFromWeek = (week) => {
  const givenWeek = week;

  if (week < 1) {
    return { error: "No affixes" };
  }

  while (week > 12) {
    week -= 12;
  }
  return { week: givenWeek, affixes: data.affixes[week - 1] };
};

exports.currentAffixes = currentAffixes;
exports.nextAffixes = nextAffixes;
exports.previousAffixes = previousAffixes;
exports.affixesFromWeek = affixesFromWeek;
