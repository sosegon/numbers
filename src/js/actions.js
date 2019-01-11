const types = require('./actionTypes.js');

/**
 * Actions to be dispatched.
 * @module actions
 */
module.exports = {
    /**
     * Dispatch {@link actionTypes.TOKEN_MOVED}.
     * @param {number} rowIndex - Row index of the {@link Cell}
     * to move the {@link Token}.
     * @param {number} colIndex - Column index of the {@link Cell}
     * to move the {@link Token}.
     */
    moveToken(rowIndex, colIndex) {
        const type = types.TOKEN_MOVED;
        return {
            type,
            rowIndex,
            colIndex
        };
    },
    /**
     * Dispatch {@link actionTypes.SCORES_UPDATED}.
     */
    updateScores() {
        const type = types.SCORES_UPDATED;
        return { type };
    },
    /**
     * Dispatch {@link actionTypes.GAME_RESET}.
     * @param {number} boardSize - Size of the {@link Board}
     * for the new {@link Game}.
     */
    resetGame(boardSize) {
        const type = types.GAME_RESET;
        return {
            type,
            boardSize
        };
    }
};