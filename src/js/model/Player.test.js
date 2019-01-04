const { Player } = require('./Player.js');
const { PLAYER_DIRECTIONS } = require('./constants.js');

const setup = () => {
    const player = new Player();

    return { player };
};

describe("Player", () => {
    it("should create player correctly", () => {
        const { player } = setup();
        expect(player.score).toEqual(0);
        expect(player.direction).toEqual(PLAYER_DIRECTIONS.NONE);
    });

    it("should increment score", () => {
        const { player } = setup();
        player.incrementScore(2);
        expect(player.score).toEqual(2);
    });

    it("should serialize", () => {
        const { player } = setup();
        expect(player.serialize()).toEqual({
            score: 0,
            direction: PLAYER_DIRECTIONS.NONE
        });
    });

    it("should convert to string", () => {
        const { player } = setup();
        expect(player.toString()).toEqual("{" +
            "\"score\":0," +
            "\"direction\":0" +
            "}"
        );
    });
});