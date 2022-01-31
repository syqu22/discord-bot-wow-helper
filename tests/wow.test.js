const { tokenPrice, characterInfo, characterAvatar } = require("../api/wow.js");

test("token", () => {
  return tokenPrice("eu").then((data) => {
    expect(data).toBe("TODO");
  });
});

test("character", () => {
  return characterInfo("eu", "kazzak", "syqu").then((data) => {
    expect(data).toBe("TODO");
  });
});

test("character_avatar", () => {
  return characterAvatar("eu", "kazzak", "syqu").then((data) => {
    expect(data).toBe("TODO");
  });
});

// TODO fix axios tests

// TODO make fetch token info a scheduled task
// TODO store token prices in database
// TODO make all regions fetch token price at the same time
// TODO finish tests
