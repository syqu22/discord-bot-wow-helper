const fs = require("fs");
const { tokenPrice, characterInfo } = require("../api/wow.js");

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
      expect(tokens.eu).toBeTruthy();
      expect(tokens.kr).toBeTruthy();
      expect(tokens.tw).toBeTruthy();
      expect(tokens.us).toBeTruthy();
    });
  });
}, 25000);

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
});
