const { logsInfo } = require("../api/logs.js");

const LOG_CODE = "6xRmBfCzJ2dLWq9M";

test("logsInfo should return promise with correct logs data", () => {
  return logsInfo(LOG_CODE).then((data) => {
    // Logs
    expect(data.duration).toBe(4219435);
    expect(data.zone.name).toBe("Sanctum of Domination");
    expect(data.zone.image).toBe("https://i.imgur.com/X5Kk2JO.jpg");
    expect(data.title).toBe("Sanctum of Domination");
    expect(typeof data.fights).toBe("object");

    // Remnant of Ner'zhul
    expect(data.fights[3].id).toBe(9);
    expect(data.fights[3].boss).toBe(2432);
    expect(data.fights[3].name).toBe("Remnant of Ner'zhul");
    expect(data.fights[3].duration).toBe(219901);
    expect(data.fights[3].difficulty).toBe("Mythic");
    expect(data.fights[3].bossPercentage).toBe("Defeated!");

    // Guardian of the First Ones
    expect(data.fights[6].id).toBe(14);
    expect(data.fights[6].boss).toBe(2436);
    expect(data.fights[6].name).toBe("Guardian of the First Ones");
    expect(data.fights[6].duration).toBe(256847);
    expect(data.fights[6].difficulty).toBe("Mythic");
    expect(data.fights[6].bossPercentage).toBe("Defeated!");
  });
}, 10000);
