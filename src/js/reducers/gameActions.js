const { TOKEN_MOVED, SCORES_UPDATED, GAME_RESET } = require('@reducers/gameActionTypes');

/**
 * Game actions to be dispatched.
 * @module gameActions
 */
module.exports = {
    /**
     * Dispatch {@link gameActionTypes.TOKEN_MOVED}.
     * @param {number} rowIndex - Row index of the {@link Cell}
     * to move the {@link Token}.
     * @param {number} colIndex - Column index of the {@link Cell}
     * to move the {@link Token}.
     */
    moveToken(rowIndex, colIndex) {
        const type = TOKEN_MOVED;
        return {
            type,
            rowIndex,
            colIndex,
        };
    },
    /**
     * Dispatch {@link gameActionTypes.SCORES_UPDATED}.
     */
    updateScores() {
        const type = SCORES_UPDATED;
        return { type };
    },
    /**
     * Dispatch {@link gameActionTypes.GAME_RESET}.
     * @param {number} boardSize - Size of the {@link Board}
     * for the new {@link Game}.
     */
    resetGame(boardSize) {
        const type = GAME_RESET;
        return {
            type,
            boardSize,
        };
    },
};
