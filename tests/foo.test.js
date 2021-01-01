const { Game } = require("../src/domain/game.js");

test("blah", () => {
    const game = new Game();
    expect(game.foo).toBe(1);
});
