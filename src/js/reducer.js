const { Game } = require('./model/Game.js');
const { LocalStorageManager } = require('./data/LocalStorageManager.js');
const { GAME_STATUSES, TURNS } = require('./model/constants.js');
const { updateObjectFromLiteral } = require('./model/utils.js');
const types = require('./actionTypes.js');

const boardSize = 9;
const game = new Game(boardSize);

const localStorageManager = new LocalStorageManager();
const previousState = localStorageManager.getGameState();
if (previousState !== null) {
    game.updateFromObject(previousState);
} else {
    localStorageManager.setGameState(game.serialize());
}
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
    const serialized = game.serialize();
    if (game.snap.turn === TURNS.PLAYER1) { // Save when player is human
        localStorageManager.setGameState(serialized)
    }
    return serialized;
};

const doResetGame = (state, action) => {
    const newGame = new Game(action.boardSize);
    const serialized = newGame.serialize();
    localStorageManager.setGameState(serialized);
    return serialized;
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