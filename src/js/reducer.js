const { Game } = require('./model/Game.js');
const { GAME_STATUSES } = require('./model/constants.js');
const { updateObjectFromLiteral } = require('./model/utils.js');
const types = require('./actionTypes.js');

const game = new Game(9);
const initialState = game.serialize();

const doMoveToken = (state, action) => {
    game.updateFromObject(state);
    game.moveToken(action.rowIndex, action.colIndex);
    game.takeCell();
    game.setStatus(GAME_STATUSES.MOVING_TOKEN);
    return game.serialize();
};

const doUpdateScores = state => {
    game.updateFromObject(state);
    game.updateScores();
    game.updateBoard();
    game.passToken();
    game.setStatus(GAME_STATUSES.RESTING);
    game.updateContinuity();
    return game.serialize();
};

const doResetGame = (state, action) => {
    const newGame = new Game(action.boardSize);
    return newGame.serialize();
};

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
    reduce
};