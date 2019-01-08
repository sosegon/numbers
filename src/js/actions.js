const types = require('./actionTypes.js');

const moveToken = (rowIndex, colIndex) => {
    const type = types.TOKEN_MOVED;
    return {
        type,
        rowIndex,
        colIndex
    };
};

const updateScores = () => {
    const type = types.SCORES_UPDATED;
    return { type };
};

const resetGame = (boardSize) => {
    const type = types.GAME_RESET;
    return {
        type,
        boardSize
    };
}

module.exports = {
    moveToken,
    updateScores,
    resetGame
};