const { Game } = require('./model/Game.js');
const { GAME_STATUSES } = require('./model/constants.js');
const { updateObjectFromLiteral } = require('./model/utils.js');
const types = require('./actionTypes.js');

const boardSize = 3;
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
            game.passToken();
            game.setStatus(GAME_STATUSES.RESTING);
            return game.serialize();

        default:
            return state;
    }
};

module.exports = {
    initialState,
    reduce
};