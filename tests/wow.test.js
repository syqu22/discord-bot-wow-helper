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
