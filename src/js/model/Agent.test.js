const { Agent } = require('./Agent.js');
const { Token } = require('./Token.js');
const { PLAYER_DIRECTIONS } = require('./flags.js');

const setup = () => {
    const matrix = [
        [2, 3, 4, 7, 8],
        [1, 1, 3, 5, 6],
        [2, 7, 6, 4, 1],
        [5, 2, 9, 0, 2],
        [8, 7, 9, 2, 1]
    ];
    const token = new Token();
    token.set(3, 3);
    const agent = new Agent();
    agent.direction = PLAYER_DIRECTIONS.VERTICAL;

    return { matrix, token, agent };
};

describe("Agent", () => {
    it("should select max value position for vertical (possible)", () => {
        const { matrix, token, agent } = setup();
        expect(agent.getMaxValuePosition(token, matrix)).toEqual([0, 3]);
    });

    it("should select max value position for vertical (not possible)", () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, -1, 8],
            [1, 1, 3, -1, 6],
            [2, 7, 6, -1, 1],
            [5, 2, 9, 0, 2],
            [8, 7, 9, -1, 1]
        ];
        expect(agent.getMaxValuePosition(token, matrix)).toEqual([-1, -1]);
    });

    it("should select max value position for horizontal (possible)", () => {
        const { matrix, token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        expect(agent.getMaxValuePosition(token, matrix)).toEqual([3, 2]);
    });

    it("should select max value position for horizontal (not possible)", () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, 3, 4, 7, 8],
            [1, 1, 3, 5, 6],
            [2, 7, 6, 4, 1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, 2, 1]
        ];
        expect(agent.getMaxValuePosition(token, matrix)).toEqual([-1, -1]);
    });

    it("should select max gain value position for vertical (possible)", () => {
        const { matrix, token, agent } = setup();
        expect(agent.getMaxGainValuePosition(token, matrix)).toEqual([0, 3]);
    });

    it("should select max gain value position for vertical (not possible)", () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, -1, 8],
            [1, 1, 3, -1, 6],
            [2, 7, 6, -1, 1],
            [5, 2, 9, 0, 2],
            [8, 7, 9, -1, 1]
        ];
        expect(agent.getMaxGainValuePosition(token, matrix)).toEqual([-1, -1]);
    });

    it("should select max gain value position for horizontal (possible)", () => {
        const { matrix, token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        expect(agent.getMaxGainValuePosition(token, matrix)).toEqual([3, 2]);
    });

    it("should select max gain value position for horizontal (not possible)", () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, 3, 4, 7, 8],
            [1, 1, 3, 5, 6],
            [2, 7, 6, 4, 1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, 2, 1]
        ];
        expect(agent.getMaxGainValuePosition(token, matrix)).toEqual([-1, -1]);
    });
});