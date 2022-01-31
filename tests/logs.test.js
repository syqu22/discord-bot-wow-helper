const { logInfo } = require("../api/logs.js");

const log_code = "6xRmBfCzJ2dLWq9M";

test("log", () => {
  return logInfo(log_code).then((data) => {
    expect(data).toBe("TODO");
  });
});

// TODO finish tests
