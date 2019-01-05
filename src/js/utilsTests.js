const { PLAYER_DIRECTIONS, TURNS, GAME_STATUSES } = require('./model/constants.js');

const storeFake = (state) => {
    return {
        default: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
        getState: () => state
    };
};

const initialState = {
    token: {
        rowIndex: 3,
        colIndex: 3,
        oldRowIndex: 3,
        oldColIndex: 3
    },
    board: [
        2, 3, 4, 7, 8,
        1, 1, 3, 5, 6,
        2, 7, 6, 4, 1,
        5, 2, 9, 0, 2,
        8, 7, 9, 2, 1
    ],
    player1: {
        score: 0,
        direction: PLAYER_DIRECTIONS.NONE
    },
    player2: {
        score: 0,
        direction: PLAYER_DIRECTIONS.NONE
    },
    snap: {
        lastValue: 0,
        isOver: false,
        turn: TURNS.PLAYER1,
        status: GAME_STATUSES.RESTING
    }
};

module.exports = {
    storeFake,
    initialState
};