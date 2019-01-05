const deepFreeze = require('deep-freeze');
const { reduce } = require('./reducer.js');
const { PLAYER_DIRECTIONS, TURNS, GAME_STATUSES } = require('./model/constants.js');
const actions = require('./actions.js');
const redux = require('redux');

const setup = () => {
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

    return {
        initialState
    };
};

describe('reducer', () => {
    it('should move token (start game horizontal)', () => {
        const { initialState } = setup();
        const store = redux.createStore(reduce, initialState);
        const action = actions.moveToken(3, 1);

        deepFreeze(initialState);
        deepFreeze(action);

        const expectedState = {
            ...initialState,
            token: {
                rowIndex: 3,
                colIndex: 1,
                oldRowIndex: 3,
                oldColIndex: 3
            },
            player1: {
                score: 0,
                direction: PLAYER_DIRECTIONS.HORIZONTAL
            },
            player2: {
                score: 0,
                direction: PLAYER_DIRECTIONS.VERTICAL
            },
            snap: {
                ...initialState.snap,
                lastValue: 2,
                status: GAME_STATUSES.MOVING_TOKEN
            }
        };
        store.dispatch(action);
        const actualState = store.getState();

        expect(expectedState).toEqual(actualState);
    });

    it('should move token (start game vertical)', () => {
        const { initialState } = setup();
        const store = redux.createStore(reduce, initialState);
        const action = actions.moveToken(1, 3);

        deepFreeze(initialState);
        deepFreeze(action);

        const expectedState = {
            ...initialState,
            token: {
                rowIndex: 1,
                colIndex: 3,
                oldRowIndex: 3,
                oldColIndex: 3
            },
            player1: {
                score: 0,
                direction: PLAYER_DIRECTIONS.VERTICAL
            },
            player2: {
                score: 0,
                direction: PLAYER_DIRECTIONS.HORIZONTAL
            },
            snap: {
                ...initialState.snap,
                lastValue: 5,
                status: GAME_STATUSES.MOVING_TOKEN
            }
        };
        store.dispatch(action);
        const actualState = store.getState();

        expect(expectedState).toEqual(actualState);
    });

    it("should update scores", () => {
        const { initialState } = setup();
        const store = redux.createStore(reduce, initialState);
        store.dispatch(actions.moveToken(3, 1)); // First, move token

        const action = actions.updateScores();

        deepFreeze(initialState);
        deepFreeze(action);

        const expectedState = {
            ...initialState,
            token: {
                rowIndex: 3,
                colIndex: 1,
                oldRowIndex: 3,
                oldColIndex: 3
            },
            player1: {
                score: 2,
                direction: PLAYER_DIRECTIONS.HORIZONTAL
            },
            player2: {
                score: 0,
                direction: PLAYER_DIRECTIONS.VERTICAL
            },
            snap: {
                ...initialState.snap,
                lastValue: 2,
                turn: TURNS.PLAYER2,
                status: GAME_STATUSES.RESTING
            }
        };
        store.dispatch(action);
        const actualState = store.getState();

        expect(expectedState).toEqual(actualState);
    });
});