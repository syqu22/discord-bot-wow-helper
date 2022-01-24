import data from "./data/affixes-data.json";

const weeksSinceFirstWeek = () => {
  const timeDifference = new Date() - new Date(data["first_week"]);

  return Math.floor(timeDifference / (1000 * 3600 * 24 * 7) + 1);
};

export const currentAffixes = () => {
  let week = weeksSinceFirstWeek();
  const currentWeek = week;

  if (week > 12) {
    week %= 12;
  }
  return { week: currentWeek, affixes: data.affixes[week - 1] };
};

export const nextAffixes = () => {
  let week = weeksSinceFirstWeek() + 1;
  const nextWeek = week;

  if (week > 12) {
    week %= 12;
  }
  return { week: nextWeek, affixes: data.affixes[week - 1] };
};

export const previousAffixes = () => {
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

export const affixesFromWeek = (week) => {
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
