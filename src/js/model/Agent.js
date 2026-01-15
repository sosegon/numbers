const { Player } = require('@model/Player');
const { PLAYER_DIRECTIONS } = require('@model/flags');
const {
    rotateClockwise,
    rotateIndicesClockwise,
    rotateIndicesCounterClockwise,
    getGainsMatrix,
    getBestGain,
} = require('@model/utils');

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
     * In the following matrix, the token is located at position `[3, 3]`
     *
     * ```
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * ```
     *
     * If the direction of the agent is **HORIZONTAL**, the algorithm determines the
     * highest value in the row where the {@link Token} is located. Only the values greater
     * than 0 are considered. The highest value is `9`; therefore, the output of the
     * will be the position of that value: `[3, 2]`.
     *
     * If the direction of the agent is **VERTICAL**, the algorithm determines the
     * highest value in the column where the {@link Token} is located. Only the values greater
     * than 0 are considered. The highest value is `7`; therefore, the output of the
     * will be the position of that value: `[0, 3]`.
     *
     * If all the values of the row or column are lower than 0, the output will be
     * `[-1, -1]`.
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
            let indices = rotateIndicesClockwise(
                token.rowIndex,
                token.colIndex,
                nBoardMatrix.length
            );
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
                return rotateIndicesCounterClockwise(
                    indexMaxValue,
                    nTokenColIndex,
                    nBoardMatrix.length
                );
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
            let indices = rotateIndicesClockwise(
                token.rowIndex,
                token.colIndex,
                nBoardMatrix.length
            );
            nTokenRowIndex = indices[0];
            nTokenColIndex = indices[1];
        }

        let gainsMatrix = getGainsMatrix(nTokenColIndex, nBoardMatrix);
        let indexBestGain = getBestGain(nTokenRowIndex, nTokenColIndex, gainsMatrix, nBoardMatrix);

        let position = [-1, -1];
        if (indexBestGain >= 0) {
            if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
                position = rotateIndicesCounterClockwise(
                    indexBestGain,
                    nTokenColIndex,
                    nBoardMatrix.length
                );
            } else {
                position = [indexBestGain, nTokenColIndex];
            }
        }

        return position;
    }
    /**
     * Get the position of the value with the best average difference in a matrix.
     * The position is either in the column or row of the {@link Token},
     * depending on the agent's direction.
     *
     * In the following matrix, the token is located at position `[3, 3]`
     *
     * ```
     * | 1  2  3  4  5  6  7|
     * |-1  6  4  7  3 -1  5|
     * | 1  2  3 -1  5  6  7|
     * | 1  2  3  0  5  6  7|
     * |-1 -1 -1  8 -1 -1 -1|
     * | 4 -1  5  9  9  1  2|
     * |-1  1  2  3 -1  9  3|
     * ```
     *
     * If the direction of the agent is **HORIZONTAL**, the algorithm evaluates each
     * row, to find the average value. The evaluation is not performed in the row
     * of the {@link Token} nor in rows which values in the same column of the {@link Token}
     * is less than `0`.
     * In the above matrix, the evaluation is not done in rows `2`
     * and `3`.
     *
     * The evaluation do not consider the values less than 0.
     * The average of a row is the sum of valid values divided by the number of
     * valid values. In the first row the average is `(1 + 2 + 3 + 5 + 6 + 7) / 6`,
     * in the second row, the average is `(6 + 4 + 3 + 5) / 4`. In the third
     * column the average is `0` since there are no valid values.
     *
     * Once each row is evaluated, the average values are subtracted from the main value
     * (the value in the same column of the token). For the above matrix, there are the
     * following results:

     * ```
     * row      main     average    difference
     *  0         4         4           0
     *  1         7         4.5         2.5
     *  2        -1    Not considered, invalid value
     *  3         0    Not considered, token's position
     *  4         8         0           8
     *  5         9         4.2         4.8
     *  6         3         3.75       -0.75
     * ```
     *
     * The row with the highest difference is selected. The output is the selected row,
     * and the column of the {@link Token}, in this example `[4, 3]`.
     *
     * The process is similar if the direction of the agent is **VERTICAL**.
     *
     * @param {Token} token
     * @param {array} boardMatrix - 2 dimensional array of numbers.
     * @returns {array} Array with 2 numbers defining the row and column of
     * the best average value.
     */
    getBestAverageValuePosition(token, boardMatrix) {
        let nBoardMatrix = boardMatrix;
        let nTokenColIndex = token.colIndex;
        let nTokenRowIndex = token.rowIndex;

        if (this.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
            nBoardMatrix = rotateClockwise(nBoardMatrix);
            let indices = rotateIndicesClockwise(
                token.rowIndex,
                token.colIndex,
                nBoardMatrix.length
            );
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
                return rotateIndicesCounterClockwise(
                    indexMaxAvgValue,
                    nTokenColIndex,
                    nBoardMatrix.length
                );
            }
            return [indexMaxAvgValue, nTokenColIndex];
        }

        return [-1, -1];
    }
}

module.exports = {
    Agent,
};
