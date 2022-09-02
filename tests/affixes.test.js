const {
  affixesFromWeek,
  currentAffixes,
  nextAffixes,
  previousAffixes,
} = require("../api/affixes.js");
const data = require("../data/affixes-data.json");

// Simulate time as it is 10th week since release
const dateMock = new Date("9:50 10-5-2022");
jest.useFakeTimers();
jest.setSystemTime(dateMock);

test("first_week should be in the correct date string format", () => {
  expect(Date.parse(data.first_week)).not.toBeNaN();
});

test("affixes should contain a list of 12 list elements", () => {
  expect(data.affixes.length).toBe(12);
});

test("Current time should be exactly 9:50 10-5-2022", () => {
  expect(dateMock).toStrictEqual(new Date());
});

test("currentAffixes should return affixes from week 10", () => {
  expect(currentAffixes()).toStrictEqual({
    affixes: data.affixes[9],
    week: 10,
  });
});

test("nextAffixes should return affixes from week 11", () => {
  expect(nextAffixes()).toStrictEqual({
    affixes: data.affixes[10],
    week: 11,
  });
});

test("previousAffixes should return affixes from week 9", () => {
  expect(previousAffixes()).toStrictEqual({
    affixes: data.affixes[8],
    week: 9,
  });
});

test("affixesFromWeek 14 should return affixes from week 14", () => {
  expect(affixesFromWeek(14)).toStrictEqual({
    affixes: data.affixes[1],
    week: 14,
  });
});
