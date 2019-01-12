const { Player } = require('./Player.js');
const { PLAYER_DIRECTIONS } = require('./flags.js');
const {
    rotateClockwise,
    rotateIndicesClockwise,
    rotateIndicesCounterClockwise,
    getGainsMatrix,
    getBestGain
} = require('./utils.js');

/**
 * Class representing an agent. An agent is a {@link Player}
 * that plays the game following a certain criteria. It is considered
 * a type of AI.
 */
class Agent extends Player {
    /**
     * Create an agent.
     */
    constructor() {
        super();
    }
    /**
     * Get the position of the highest value in a matrix.
     * The position is either in the column or row of the {@link Token},
     * depending on the agent's direction.
     *
     * In the following matrix, the token is located at position <code>[3, 3]</code>
     *
     * <pre><code>
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * </code></pre>
     *
     * If the direction of the agent is **HORIZONTAL**, the algorithm determines the
     * highest value in the row where the {@link Token} is located. Only the values greater
     * than 0 are considered. The highest value is <code>9</code>; therefore, the output of the
     * will be the position of that value: <code>[3, 2]</code>.
     *
     * If the direction of the agent is **VERTICAL**, the algorithm determines the
     * highest value in the column where the {@link Token} is located. Only the values greater
     * than 0 are considered. The highest value is <code>7</code>; therefore, the output of the
     * will be the position of that value: <code>[0, 3]</code>.
     *
     * If all the values of the row or column are lower than 0, the output will be
     * <code>[-1, -1]</code>.
     *
     * @param {Token} token
     * @param {array} boardMatrix - 2 dimensional array of numbers.
     * @returns {array} Array with 2 numbers defining the row and column of the highest value.
     */
    getMaxValuePosition(token, boardMatrix) {
        let nBoardMatrix = boardMatrix;
        let nTokenColIndex = token.colIndex;

        if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
            nBoardMatrix = rotateClockwise(boardMatrix);
            let indices = rotateIndicesClockwise(token.rowIndex, token.colIndex, nBoardMatrix.length);
            nTokenColIndex = indices[1];
        }

        // TODO: add exception when directions is not HORIZONTAL nor VERTICAL

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
    }
    /**
     * Get the position of the value with the best gain in a matrix.
     * The position is either in the column or row of the {@link Token},
     * depending on the agent's direction.
     *
     * The algorithm relies on the {@link utils.getBestGain} function.
     *
     * @param {Token} token
     * @param {array} boardMatrix
     * @returns {array} Array with 2 numbers defining the row and column of the value
     * with best gain.
     */
    getMaxGainValuePosition(token, boardMatrix) {
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
    }
    // TODO: Comment to generate documentation
    getBestAverageValuePosition(token, boardMatrix) {
        let nBoardMatrix = boardMatrix;
        let nTokenColIndex = token.colIndex;
        let nTokenRowIndex = token.rowIndex;

        if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
            nBoardMatrix = rotateClockwise(nBoardMatrix);
            let indices = rotateIndicesClockwise(token.rowIndex, token.colIndex, nBoardMatrix.length);
            nTokenRowIndex = indices[0];
            nTokenColIndex = indices[1];
        }

        let indexMaxAvgValue = -1;
        let maxAvgValue = -Infinity;
        for (let i = 0; i < nBoardMatrix.length; i++) {
            const valueToSelect = nBoardMatrix[i][nTokenColIndex];
            // Skip the token itself or empty cells
            if (i === nTokenRowIndex || valueToSelect <= 0) {
                continue;
            }

            let avgValue = 0;
            let count = 0;
            for (let j = 0; j < nBoardMatrix.length; j++) {
                // Skip the value in the token's column or empty ones
                if (j === nTokenColIndex || nBoardMatrix[i][j] <= 0) {
                    continue;
                }
                avgValue += nBoardMatrix[i][j];
                count++;
            }

            if (avgValue > 0 && count > 0) {
                avgValue /= count;
            }

            if (valueToSelect - avgValue > maxAvgValue) {
                maxAvgValue = valueToSelect - avgValue;
                indexMaxAvgValue = i;
            }
        }

        if (indexMaxAvgValue >= 0) {
            if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
                return rotateIndicesCounterClockwise(indexMaxAvgValue, nTokenColIndex, nBoardMatrix.length);
            }
            return [indexMaxAvgValue, nTokenColIndex];
        }

        return [-1, -1];
    }
}

module.exports = {
    Agent
};