const { PLAYER_DIRECTIONS, TURNS, GAME_STATUSES, GAME_CONTINUITY } = require('@model/flags.js');

const initialGameState = {
    token: {
        rowIndex: 3,
        colIndex: 3,
        oldRowIndex: 3,
        oldColIndex: 3,
    },
    board: [2, 3, 4, 7, 8, 1, -1, 3, -1, 6, 2, 7, 6, 4, 1, 5, -1, 9, 0, 2, 8, 7, 9, 2, 1],
    player1: {
        score: 0,
        direction: PLAYER_DIRECTIONS.NONE,
    },
    player2: {
        score: 0,
        direction: PLAYER_DIRECTIONS.NONE,
    },
    snap: {
        lastValue: 0,
        continuity: GAME_CONTINUITY.CONTINUE,
        turn: TURNS.PLAYER1,
        status: GAME_STATUSES.RESTING,
    },
};

const verticalPosition = {
    rowIndex: 0,
    colIndex: 3,
    value: 7,
    'data-testid': 'cell-vertical',
};

const horizontalPosition = {
    rowIndex: 3,
    colIndex: 0,
    value: 5,
    'data-testid': 'cell-horizontal',
};

const otherPosition = {
    rowIndex: 2,
    colIndex: 2,
    value: 6,
    'data-testid': 'cell-other',
};

const verticalPositionHid = {
    rowIndex: 1,
    colIndex: 3,
    value: -1,
    'data-testid': 'cell-vertical-hid',
};

const horizontalPositionHid = {
    rowIndex: 3,
    colIndex: 1,
    value: -1,
    'data-testid': 'cell-horizontal-hid',
};

const otherPositionHid = {
    rowIndex: 1,
    colIndex: 1,
    value: -1,
    'data-testid': 'cell-other-hid',
};

module.exports = {
    initialState: { game: initialGameState, settings: { soundEnabled: true } },
    verticalPosition,
    horizontalPosition,
    otherPosition,
    verticalPositionHid,
    horizontalPositionHid,
    otherPositionHid,
};
