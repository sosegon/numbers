const { Player } = require('./Player.js');
const { PLAYER_DIRECTIONS } = require('./constants.js');
const {
    rotateClockwise,
    rotateIndicesClockwise,
    rotateIndicesCounterClockwise,
    getGainsMatrix,
    getBestGain
} = require('./utils.js');

class Agent extends Player {
    constructor() {
        super();
    }
    maxCell = (token, boardMatrix) => {
        // Simply select the cell with the highest value
        let nBoardMatrix = boardMatrix;
        let nTokenColIndex = token.colIndex;

        if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
            nBoardMatrix = rotateClockwise(boardMatrix);
            let indices = rotateIndicesClockwise(token.rowIndex, token.colIndex, nBoardMatrix.length);
            nTokenColIndex = indices[1];
        }

        let indexMaxValue = -1;
        let maxValue = -1;
        for (let i = 0; i < nBoardMatrix.length; i++) {
            let cell = nBoardMatrix[i][nTokenColIndex];
            if (cell > maxValue) {
                maxValue = cell;
                indexMaxValue = i;
            }
        }

        if (maxValue > 0) {
            if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
                return rotateIndicesCounterClockwise(indexMaxValue, nTokenColIndex, nBoardMatrix.length);
            }
            return [indexMaxValue, nTokenColIndex];
        }

        return [-1, -1];
    };
    maxGainCell = (token, boardMatrix) => {
        // Get the cell with highest gain with respect to next turn
        let nBoardMatrix = boardMatrix;
        let nTokenColIndex = token.colIndex;
        let nTokenRowIndex = token.rowIndex;

        if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
            nBoardMatrix = rotateClockwise(nBoardMatrix);
            let indices = rotateIndicesClockwise(token.rowIndex, token.colIndex, nBoardMatrix.length);
            nTokenRowIndex = indices[0];
            nTokenColIndex = indices[1];
        }

        let gainsMatrix = getGainsMatrix(nTokenColIndex, nBoardMatrix);
        let indexBestGain = getBestGain(nTokenRowIndex, nTokenColIndex, gainsMatrix, nBoardMatrix);

        let position = [-1, -1];
        if (indexBestGain >= 0) {
            if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
                position = rotateIndicesCounterClockwise(indexBestGain, nTokenColIndex, nBoardMatrix.length);
            } else {
                position = [indexBestGain, nTokenColIndex];
            }
        }

        return position;
    };
}

module.exports = {
    Agent
};