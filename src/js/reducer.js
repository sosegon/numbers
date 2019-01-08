const { Game } = require('./model/Game.js');
const { GAME_STATUSES } = require('./model/constants.js');
const { updateObjectFromLiteral } = require('./model/utils.js');
const types = require('./actionTypes.js');

const boardSize = 5;
const game = new Game(boardSize);
const initialState = game.serialize();

const reduce = (state = initialState, action) => {
    switch (action.type) {
        case types.TOKEN_MOVED:
            game.updateFromObject(state);
            game.moveToken(action.rowIndex, action.colIndex);
            game.takeCell();
            game.setStatus(GAME_STATUSES.MOVING_TOKEN);
            return game.serialize();

        case types.SCORES_UPDATED:
            game.updateFromObject(state);
            game.updateScores();
            game.updateBoard();
            game.passToken();
            game.setStatus(GAME_STATUSES.RESTING);
            game.updateContinuity();
            return game.serialize();

        case types.GAME_RESET:
            const newGame = new Game(action.boardSize);
            return newGame.serialize();

        default:
            return state;
    }
};

module.exports = {
    initialState,
    reduce
};