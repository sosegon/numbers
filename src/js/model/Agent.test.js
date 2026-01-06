const { Agent } = require('@model/Agent');
const { Token } = require('@model/Token');
const { PLAYER_DIRECTIONS } = require('@model/flags');

const setup = () => {
    const matrix = [
        [2, 3, 4, 7, 8],
        [1, 1, 3, 5, 6],
        [2, 7, 6, 4, 1],
        [5, 2, 9, 0, 2],
        [8, 7, 9, 2, 1],
    ];
    const token = new Token();
    token.set(3, 3);
    const agent = new Agent();
    agent.direction = PLAYER_DIRECTIONS.VERTICAL;

    return { matrix, token, agent };
};

describe('Agent', () => {
    it('should select max value position for vertical (possible)', () => {
        const { matrix, token, agent } = setup();
        expect(agent.getMaxValuePosition(token, matrix)).toEqual([0, 3]);
    });

    it('should select max value position for vertical (not possible)', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, -1, 8],
            [1, 1, 3, -1, 6],
            [2, 7, 6, -1, 1],
            [5, 2, 9, 0, 2],
            [8, 7, 9, -1, 1],
        ];
        expect(agent.getMaxValuePosition(token, matrix)).toEqual([-1, -1]);
    });

    it('should select max value position for horizontal (possible)', () => {
        const { matrix, token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        expect(agent.getMaxValuePosition(token, matrix)).toEqual([3, 2]);
    });

    it('should select max value position for horizontal (not possible)', () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, 3, 4, 7, 8],
            [1, 1, 3, 5, 6],
            [2, 7, 6, 4, 1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, 2, 1],
        ];
        expect(agent.getMaxValuePosition(token, matrix)).toEqual([-1, -1]);
    });

    it('should select max gain value position for vertical (possible)', () => {
        const { matrix, token, agent } = setup();
        expect(agent.getMaxGainValuePosition(token, matrix)).toEqual([0, 3]);
    });

    it('should select max gain value position for vertical (not possible)', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, -1, 8],
            [1, 1, 3, -1, 6],
            [2, 7, 6, -1, 1],
            [5, 2, 9, 0, 2],
            [8, 7, 9, -1, 1],
        ];
        expect(agent.getMaxGainValuePosition(token, matrix)).toEqual([-1, -1]);
    });

    it('should select max gain value position for horizontal (possible)', () => {
        const { matrix, token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        expect(agent.getMaxGainValuePosition(token, matrix)).toEqual([3, 2]);
    });

    it('should select max gain value position for horizontal (not possible)', () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, 3, 4, 7, 8],
            [1, 1, 3, 5, 6],
            [2, 7, 6, 4, 1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, 2, 1],
        ];
        expect(agent.getMaxGainValuePosition(token, matrix)).toEqual([-1, -1]);
    });

    it('should select max avg value position for vertical (possible)', () => {
        const { agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.VERTICAL;
        const matrix = [
            [1, 2, 3, 4, 5, 6, 7],
            [-1, 6, 4, 7, 3, -1, 5],
            [1, 2, 3, -1, 5, 6, 7],
            [1, 2, 3, 0, 5, 6, 7],
            [-1, -1, -1, 8, -1, -1, -1],
            [4, -1, 5, 9, 9, 1, 2],
            [-1, 1, 2, 3, -1, 9, 3],
        ];
        const token = new Token();
        token.set(3, 3);
        expect(agent.getBestAverageValuePosition(token, matrix)).toEqual([4, 3]);
    });

    it('should select max avg value position for vertical (not possible)', () => {
        const { agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.VERTICAL;
        const matrix = [
            [1, 2, 3, -1, 5, 6, 7],
            [-1, 6, 4, -1, 3, -1, 5],
            [1, 2, 3, -1, 5, 6, 7],
            [1, 2, 3, 0, 5, 6, 7],
            [-1, -1, -1, -1, -1, -1, -1],
            [4, -1, 5, -1, 9, 1, 2],
            [-1, 1, 2, -1, -1, 9, 3],
        ];
        const token = new Token();
        token.set(3, 3);
        expect(agent.getBestAverageValuePosition(token, matrix)).toEqual([-1, -1]);
    });

    it('should select max avg value position for vertical (possible)', () => {
        const { agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [1, 2, 3, 4, 5, 6, 7],
            [-1, 6, 4, 7, 3, -1, 5],
            [1, 2, 3, -1, 5, 6, 7],
            [1, 2, 3, 0, 5, 6, 7],
            [-1, -1, -1, 8, -1, -1, -1],
            [4, -1, 5, 9, 9, 1, 2],
            [-1, 1, 2, 3, -1, 9, 3],
        ];
        const token = new Token();
        token.set(3, 3);
        expect(agent.getBestAverageValuePosition(token, matrix)).toEqual([3, 6]);
    });

    it('should select max avg value position for vertical (not possible)', () => {
        const { agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [1, 2, 3, -1, 5, 6, 7],
            [-1, 6, 4, -1, 3, -1, 5],
            [1, 2, 3, -1, 5, 6, 7],
            [1, 2, 3, 0, 5, 6, 7],
            [-1, -1, -1, -1, -1, -1, -1],
            [4, -1, 5, -1, 9, 1, 2],
            [-1, 1, 2, -1, -1, 9, 3],
        ];
        const token = new Token();
        token.set(3, 3);
        expect(agent.getBestAverageValuePosition(token, matrix)).toEqual([3, 6]);
    });
});
