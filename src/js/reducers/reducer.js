const { Game } = require('@model/Game');
const { GAME_STATUSES } = require('@model/flags');
const types = require('@reducers/actionTypes');

const game = new Game(9);
const initialState = game.serialize();

const doMoveToken = (state, action) => {
    game.updateFromObject(state);
    game.moveToken(action.rowIndex, action.colIndex);
    game.updateLastValueInCellWhereTokenIs();
    game.updateStatus(GAME_STATUSES.MOVING_TOKEN);
    return game.serialize();
};

const doUpdateScores = (state) => {
    game.updateFromObject(state);
    game.updateCurrentPlayerScore();
    game.updateCellsWhereTokenIs();
    game.passToken();
    game.updateStatus(GAME_STATUSES.RESTING);
    game.updateContinuity();
    return game.serialize();
};

const doResetGame = (state, action) => {
    const newGame = new Game(action.boardSize);
    return newGame.serialize();
};

/**
 * Update the state of the game based
 * on the received {@link actions}
 * @param {object} state - State of the application.
 * @param {object} action - Action with relevant data to update the state
 * of the application.
 */
const reduce = (state = initialState, action) => {
    switch (action.type) {
        case types.TOKEN_MOVED:
            return doMoveToken(state, action);

        case types.SCORES_UPDATED:
            return doUpdateScores(state);

        case types.GAME_RESET:
            return doResetGame(state, action);

        default:
            return state;
    }
};

module.exports = {
    initialState,
    reduce,
};
