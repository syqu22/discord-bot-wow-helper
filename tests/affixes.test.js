import {
  affixesFromWeek,
  currentAffixes,
  nextAffixes,
  previousAffixes,
} from "../affixes.js";
import data from "../data/affixes-data.js";
import { jest } from "@jest/globals";

// Simulate time as it is 25th week since release
const fakeDate = new Date("10:50 12-23-2021");
jest.useFakeTimers();
jest.setSystemTime(fakeDate);

test("first_week should be in the correct date string format", () => {
  expect(Date.parse(data.first_week)).not.toBeNaN();
});

test("affixes should contain a list of 12 list elements", () => {
  expect(data.affixes.length).toBe(12);
});

test("Current fake time should be exactly 10:50 12-23-2021", () => {
  expect(fakeDate).toStrictEqual(new Date());
});

test("currentAffixes should return affixes from week 25", () => {
  expect(currentAffixes()).toStrictEqual({
    affixes: data.affixes[0],
    week: 25,
  });
});

test("nextAffixes should return affixes from week 26", () => {
  expect(nextAffixes()).toStrictEqual({
    affixes: data.affixes[1],
    week: 26,
  });
});

test("previousAffixes should return affixes from week 24", () => {
  expect(previousAffixes()).toStrictEqual({
    affixes: data.affixes[11],
    week: 24,
  });
});

test("affixesFromWeek 12 should return affixes from given week", () => {
  expect(affixesFromWeek(12)).toStrictEqual({
    affixes: data.affixes[11],
    week: 12,
  });
});
