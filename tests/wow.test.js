const fs = require("fs");
const { tokenPrice, characterInfo } = require("../api/wow.js");
require("dotenv").config();

const charMock = {
  region: "eu",
  realm: "kazzak",
  name: "syqu",
};

test("tokenPrice should fetch WoW tokens correctly and save them to data folder", async () => {
  return tokenPrice().then(() => {
    fs.readFile("./data/wowtoken-data.json", "utf8", (err, data) => {
      expect(err).toBe(null);

      const tokens = JSON.parse(data);
      expect(tokens.regions.eu).toBeTruthy();
      expect(tokens.regions.kr).toBeTruthy();
      expect(tokens.regions.tw).toBeTruthy();
      expect(tokens.regions.us).toBeTruthy();
      expect(tokens.last_update).toBeTruthy();
    });
  });
}, 60000);

test("characterInfo should return correct character data", () => {
  return characterInfo(charMock.region, charMock.realm, charMock.name).then(
    (data) => {
      expect(data.achiev_points).toBeTruthy();
      expect(data.class).toBe("Druid");
      expect(data.covenant.name).toBeTruthy();
      expect(data.covenant.renown).toBeTruthy();
      expect(data.faction).toBe("Horde");
      expect(data.guild).toBeTruthy();
      expect(data.ilvl).toBeTruthy();
      expect(data.name).toBe("Syqu");
      expect(data.race).toBeTruthy();
      expect(data.realm).toBe("Kazzak");
      expect(data.spec).toBe("Restoration");
      expect(data.image).toMatch(
        `render.worldofwarcraft.com/${charMock.region}/character/${charMock.realm}/`
      );
    }
  );
}, 10000);
