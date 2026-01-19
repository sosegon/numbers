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

    it('should select a position to end the game with victory for vertical', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, 1, 8],
            [-1, -1, -1, 4, -1],
            [-1, -1, -1, 5, -1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, 2, 1],
        ];
        const scores = { player: 24, agent: 20 };
        expect(agent.getPositionToEndGameWithVictory(token, matrix, scores)).toEqual([2, 3]);
    });

    it('should select a position to end the game with victory for vertical (not possible)', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, 1, 8],
            [1, 1, 3, 2, 6],
            [-1, -1, -1, 3, -1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, 2, 1],
        ];
        const scores = { player: 24, agent: 20 };
        expect(agent.getPositionToEndGameWithVictory(token, matrix, scores)).toEqual([-1, -1]);
    });

    it('should select a position to end the game with victory for horizontal', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, -1, -1, 1, 8],
            [1, -1, -1, 2, 6],
            [2, -1, -1, 3, 1],
            [1, 3, 5, 0, 4],
            [8, -1, -1, 2, 1],
        ];
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const scores = { player: 24, agent: 20 };
        expect(agent.getPositionToEndGameWithVictory(token, matrix, scores)).toEqual([3, 2]);
    });

    it('should select a position to end the game with victory for horizontal (not possible)', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, 1, 8],
            [1, 1, 3, 2, 6],
            [2, 7, 6, 3, 1],
            [1, 2, 3, 0, 4],
            [8, 7, 9, 2, 1],
        ];
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const scores = { player: 24, agent: 20 };
        expect(agent.getPositionToEndGameWithVictory(token, matrix, scores)).toEqual([-1, -1]);
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

    it('should select max gain value position for vertical to win game (end)', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, 2, 8],
            [-1, -1, -1, 4, -1],
            [-1, -1, -1, 5, -1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, 2, 1],
        ];
        expect(agent.getMaxGainValuePosition(token, matrix, { player: 24, agent: 20 })).toEqual([
            2, 3,
        ]);
    });

    it('should select max gain value position for vertical to win game (continue)', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, 2, 8],
            [-1, -1, -1, 4, -1],
            [-1, -1, -1, 5, -1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, 2, 1],
        ];
        expect(agent.getMaxGainValuePosition(token, matrix, { player: 28, agent: 20 })).not.toEqual(
            [2, 3]
        );
        expect(agent.getMaxGainValuePosition(token, matrix, { player: 28, agent: 20 })).not.toEqual(
            [1, 3]
        );
        expect(agent.getMaxGainValuePosition(token, matrix, { player: 28, agent: 20 })).toEqual([
            0, 3,
        ]);
    });

    it('should select max gain value position for vertical to win game (forced end)', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, 3, 4, -1, 8],
            [-1, -1, -1, 4, -1],
            [-1, -1, -1, 5, -1],
            [-1, -1, -1, 0, -1],
            [8, 7, 9, -1, 1],
        ];
        expect(agent.getMaxGainValuePosition(token, matrix, { player: 28, agent: 20 })).toEqual([
            2, 3,
        ]);
    });
    it('should select max gain value position for vertical to force player lose in next turn', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, -1, -1, 1, 3],
            [-1, -1, 2, 4, -1],
            [-1, 2, -1, 5, -1],
            [-1, -1, -1, 0, -1],
            [-1, 7, 9, 2, -1],
        ];
        const position = agent.getMaxGainValuePosition(token, matrix, { player: 20, agent: 23 });
        expect(position).toEqual([0, 3]);
    });

    it('should select max gain value position for vertical when cannot force player lose in next turn', () => {
        const { token, agent } = setup();
        const matrix = [
            [2, -1, -1, 1, 3],
            [-1, -1, 2, 4, -1],
            [-1, 2, -1, 5, -1],
            [-1, -1, -1, 0, -1],
            [-1, 7, 9, 2, -1],
        ];
        const position = agent.getMaxGainValuePosition(token, matrix, { player: 20, agent: 20 });
        expect(position).not.toEqual([0, 3]);
        expect(position).toEqual([2, 3]);
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

    it('should select max gain value position for horizontal to win game (end)', () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, -1, -1, -1, 8],
            [3, -1, -1, -1, 9],
            [4, -1, -1, -1, 2],
            [2, 4, 5, 0, 1],
            [8, -1, -1, -1, 1],
        ];

        expect(agent.getMaxGainValuePosition(token, matrix, { player: 24, agent: 20 })).toEqual([
            3, 2,
        ]);
    });

    it('should select max gain value position for horizontal to win game (continue)', () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, -1, -1, -1, 8],
            [3, -1, -1, -1, 9],
            [4, -1, -1, -1, 2],
            [2, 4, 5, 0, 1],
            [8, -1, -1, -1, 1],
        ];

        expect(agent.getMaxGainValuePosition(token, matrix, { player: 28, agent: 20 })).not.toEqual(
            [3, 2]
        );
        expect(agent.getMaxGainValuePosition(token, matrix, { player: 28, agent: 20 })).not.toEqual(
            [3, 1]
        );
        expect(agent.getMaxGainValuePosition(token, matrix, { player: 28, agent: 20 })).toEqual([
            3, 0,
        ]);
    });

    it('should select max gain value position for horizontal to win game (forced end)', () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, -1, -1, -1, 8],
            [3, -1, -1, -1, 9],
            [4, -1, -1, -1, 2],
            [-1, 4, 5, 0, -1],
            [8, -1, -1, -1, 1],
        ];

        expect(agent.getMaxGainValuePosition(token, matrix, { player: 28, agent: 20 })).toEqual([
            3, 2,
        ]);
    });

    it('should select max gain value position for horizontal to force player lose in next turn', () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, -1, -1, -1, -1],
            [-1, -1, 2, -1, 7],
            [-1, 2, -1, -1, 2],
            [1, 4, 5, 0, 2],
            [3, -1, -1, -1, -1],
        ];
        const position = agent.getMaxGainValuePosition(token, matrix, { player: 20, agent: 23 });
        expect(position).toEqual([3, 0]);
    });

    it('should select max gain value position for horizontal when cannot force player lose in next turn', () => {
        const { token, agent } = setup();
        agent.direction = PLAYER_DIRECTIONS.HORIZONTAL;
        const matrix = [
            [2, -1, -1, -1, -1],
            [-1, -1, 2, -1, 7],
            [-1, 2, -1, -1, 2],
            [1, 4, 5, 0, 2],
            [3, -1, -1, -1, -1],
        ];
        const position = agent.getMaxGainValuePosition(token, matrix, { player: 20, agent: 20 });
        expect(position).not.toEqual([3, 0]);
        expect(position).toEqual([3, 2]);
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
