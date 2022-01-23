const affixes = require("./affixes.json");

// affixes["first_week"] = date of the first week
// affixes[1] = first week affixes
// affixes[12] = last week affixes

export const weeksSinceFirstWeek = () => {
  const timeDifference = new Date() - new Date(affixes["first_week"]);

  return Math.floor(timeDifference / (1000 * 3600 * 24 * 7) + 1);
};

export const currentAffixes = () => {
  let week = weeksSinceFirstWeek();
  while (week > 12) {
    week -= 12;
  }
  return { week: week, affixes: affixes[week] };
};

export const nextAffixes = () => {
  let week = weeksSinceFirstWeek() + 1;
  while (week > 12) {
    week -= 12;
  }
  return { week: week, affixes: affixes[week] };
};

export const previousAffixes = () => {
  let week = weeksSinceFirstWeek() - 1;
  if (week < 1) {
    return { error: "No affixes" };
  }

  while (week > 12) {
    week -= 12;
  }
  return { week: week, affixes: affixes[week] };
};

export const affixesFromWeek = (week) => {
  if (week < 1) {
    return { error: "No affixes" };
  }

  while (week > 12) {
    week -= 12;
  }
  return { week: week, affixes: affixes[week] };
};
