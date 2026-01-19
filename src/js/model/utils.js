/**
 * Utility functions for the logic's game.
 * @module utils
 */
const self = (module.exports = {
    /**
     * Rotate a square matrix clockwisely.
     *
     * The following matrix:
     *
     * ```
     * | 1  2  3 |
     * | 4  5  6 |
     * | 7  8  9 |
     * ```
     *
     * It is converted to the next one:
     *
     * ```
     * | 7  4  1 |
     * | 8  5  2 |
     * | 9  6  3 |
     * ```
     *
     * @param {array} matrix - 2 dimensional array of number representing a square matrix.
     * @returns {array}  2 dimensional array of number representing a rotated square matrix.
     */
    rotateClockwise(matrix) {
        let size = matrix.length;
        let newMatrix = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(matrix[size - j - 1][i]);
            }
            newMatrix.push(row);
        }

        return newMatrix;
    },
    /**
     * Rotate a square matrix counter-clockwisely.
     *
     * The following matrix:
     *
     * ```
     * | 1  2  3 |
     * | 4  5  6 |
     * | 7  8  9 |
     * ```
     *
     * It is converted to the next one:
     *
     * ```
     * | 3  6  9 |
     * | 2  5  8 |
     * | 1  4  7 |
     * ```
     *
     * @param {array} matrix - 2 dimensional array of number representing a square matrix.
     * @returns {array}  2 dimensional array of number representing a rotated square matrix.
     */
    rotateCounterClockwise(matrix) {
        let size = matrix.length;
        let newMatrix = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(matrix[j][size - i - 1]);
            }
            newMatrix.push(row);
        }

        return newMatrix;
    },
    /**
     * Rotate row and column indices of an element in a square matrix clockwisely.
     *
     * In the following 5x5 matrix, take the element located at position `[3, 3]`
     *
     * ```
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * ```
     *
     * The matrix rotated clockwisely will be the next one:
     *
     * ```
     * | 8  5  2  1  2 |
     * | 7  2  7 -1  3 |
     * | 9  9  6  3  4 |
     * | 2  0  4  5  7 |
     * | 1  2  1  6  8 |
     * ```
     *
     * Then, the output will be `[3, 1]`
     *
     * @param {number} rowIndex
     * @param {number} colIndex
     * @param {number} size - Size of the square matrix.
     * @returns {array} Array with two numbers defining the rotated row and column indices.
     */
    rotateIndicesClockwise(rowIndex, colIndex, size) {
        if (size <= 0) {
            throw new Error('Size of matrix has to be greater than 0');
        }

        if (rowIndex >= size || colIndex >= size) {
            throw new Error('Indices has to be less than size of matrix');
        }

        return [colIndex, size - rowIndex - 1];
    },
    /**
     * Rotate row and column indices of an element in a square matrix counter-clockwisely.
     *
     * In the following 5x5 matrix, take the element located at position `[3, 3]`
     *
     * ```
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * ```
     *
     * The matrix rotated clockwisely will be the next one:
     *
     * ```
     * | 8  6  1  2  1 |
     * | 7  5  4  0  2 |
     * | 4  3  6  9  9 |
     * | 3 -1  7  2  7 |
     * | 2  1  2  5  8 |
     * ```
     *
     * Then, the output will be `[1, 3]`
     *
     * @param {number} rowIndex
     * @param {number} colIndex
     * @param {number} size - Size of the square matrix.
     * @returns {array} Array with two numbers defining the rotated row and column indices.
     */
    rotateIndicesCounterClockwise(rowIndex, colIndex, size) {
        if (size <= 0) {
            throw new Error('Size of matrix has to be greater than 0');
        }

        if (rowIndex >= size || colIndex >= size) {
            throw new Error('Indices has to be less than size of matrix');
        }

        return [size - colIndex - 1, rowIndex];
    },

    /**
     * Get the readiness to end game of each row in a matrix given a
     * column. A row is ready to end game when all its elements (except
     * the one in the column passed as argument) are less than `0`.
     * Also, a row is available when the element in the column passed as
     * argument is greater than `0`.
     *
     * In the following matrix, the token is located in the position `[3, 3]`
     *
     * ```
     * | -1 -1 -1  7 -1 |
     * | -1 -1 -1 -1 -1 |
     * |  2  7  6 -1  1 |
     * |  5  2  9  0  2 |
     * |  8  7  9  5  1 |
     * ```
     *
     * The output will be the following array:
     *
     * ```
     * [
     *   [true, true],
     *   [true, false],
     *   [false, false],
     *   [false, false],
     *   [false, true]
     * ]
     * ```
     * Where the first element of each sub-array indicates if the row is
     * ready to end game, and the second element indicates if the row is
     * available.
     *
     * @param {array} boardMatrix - 2 dimensional array of numbers
     * representing a square matrix.
     * @param {number} tokenColIndex - Index of the column where the
     * token is located.
     * @returns {array} Array of arrays, each containing two boolean
     * values indicating readiness and availability of each row.
     */
    getRowsReadinessToEndGame(boardMatrix, tokenColIndex) {
        let rows = [];
        let size = boardMatrix.length;

        for (let i = 0; i < size; i++) {
            let isRowReadyToEndGame = true;
            let isRowAvailable = true;
            for (let j = 0; j < size; j++) {
                if (j === tokenColIndex) {
                    isRowAvailable = boardMatrix[i][j] > 0;
                } else if (boardMatrix[i][j] > 0) {
                    isRowReadyToEndGame = false;
                }
            }
            rows.push([isRowReadyToEndGame, isRowAvailable]);
        }

        return rows;
    },
    /**
     * Get the horizontal gains of a matrix given a column.
     * The gains are calculated by subtracting the values of each column
     * in the matrix from the column which index is passed as argument.
     *
     * In the following matrix, the token is located in the position `[3, 3]`
     *
     * ```
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * ```
     *
     * The output will be the following matrix:
     *
     * ```
     * | 5  4  3  0 -1 |
     * | 4  0  2  0 -1 |
     * | 2 -3 -2  0  3 |
     * | 0  0  0  0  0 |
     * |-6 -5 -7  0  1 |
     * ```
     *
     * Notice how the elements in the row and column of the token are set to `0`.
     * Also, the positions where the value is less than `0` are set to `0` as well
     * e.g. position `[1, 1]`.
     *
     * @param {number} tokenColIndex - Index of the column.
     * @param {array} gameMatrix - 2 dimensional array of numbers representing a square matrix.
     * @returns {array} 2 dimensional array of numbers representing the matrix of gains.
     */
    getGainsMatrix(tokenColIndex, gameMatrix) {
        // Assume the direction is vertical, so the agent
        // selects over a column
        let size = gameMatrix.length;
        let gainsMatrix = [];
        let nGameMatrix = gameMatrix;
        let nTokenColIndex = tokenColIndex;

        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                if (nGameMatrix[i][nTokenColIndex] <= 0) {
                    row.push(0);
                } else {
                    row.push(nGameMatrix[i][nTokenColIndex] - nGameMatrix[i][j]);
                }
            }
            gainsMatrix.push(row);
        }

        return gainsMatrix;
    },
    /**
     * Get the indices of the element in the game matrix which gain is the highest.
     * **VERTICAL** direction assumed.
     *
     * Given the following game and gain matrices:
     *
     * ```
     * | 2  3  4  7  8 |    | 5  4  3  0 -1 |
     * | 1 -1  3  5  5 |    | 4  0  2  0  0 |
     * | 2  7  6  4  1 |    | 2 -3 -2  0  3 |
     * | 5  2  9  0  2 |    | 0  0  0  0  0 |
     * | 8  7  9  2  1 |    |-6 -5 -7  0  1 |
     * ```
     *
     * Where the token is at position `[3, 3]`. The objective is to
     * select the element in the same column of the token, which value
     * gives the overall best gain. It assumes that the best move for
     * the opponent is to select the highest value in the row that may
     * be selected by the current player:
     * ```
     * Possible rows to select:
     * row 0: possible opponent's selections: 2, 3, 4, x, 8  => best: 8
     * row 1: possible opponent's selections: 1, x, 3, x, 5  => best: 5
     * row 2: possible opponent's selections: 2, 7, 6, x, 1  => best: 7
     * row 3: not possible, the token is here.
     * row 4: possible opponent's selections: 8, 7, 9, x, 1  => best: 9
     * ```
     * For each row, the best gain is the element which difference is
     * the lowest when subtracting the best opponent's selection:
     *
     * ```
     * lowest value = (player's selection) - (opponent's best selection)
     *
     * row: 0, lowest value: -1, column: 4 (7 - 8 = -1)
     * row: 1, lowest value:  0, column: 4 (5 - 5 = 0)
     * row: 2, lowest value: -3, column: 1 (4 - 7 = -3)
     * row: 3, this is the column of the token, it is not considered.
     * row: 4, lowest value: -7, column: 2 (2 - 9 = -7)
     * ```
     *
     * Notice in row `1`, the lowest values are at columns `1`
     * and `4`.
     * Generally, the lowest column is selected. But in this case,
     * the value at `[1, 1]` in the game matrix is less than `0`. Thus,
     * that element is not considered.
     *
     * The resulting lowest values are the following:
     * ```
     * row 0: -1
     * row 1:  0
     * row 2: -3
     * row 3: Not considered, the token is here.
     * row 4: -7
     * ```
     *
     * The chosen value is the highest one: `0`. Therefore, the row of that
     * value is selected: row `1`.
     *
     * The output will be the selected row and the column of the token:
     * row `1`, column `3`.
     *
     * @param {number} tokenRowIndex
     * @param {number} tokenColIndex
     * @param {array} boardMatrix - 2 dimensional array of numbers representing a square board matrix.
     * @param {array} gainsMatrix - 2 dimensional array of numbers representing a square gains matrix.
     * @param {array} rowsReadinessToEndGame - Array of arrays, each containing two boolean
     * values indicating readiness and availability of each row to end game.
     * @returns {array} Array objects containing gain, rowIndex, isRowReadyToEndGame,
     * isRowAvailable, and availableColumns, sorted by gain descending.
     */
    getRowsIndicesByOrderedGain(
        tokenRowIndex,
        tokenColIndex,
        boardMatrix,
        gainsMatrix,
        rowsReadinessToEndGame
    ) {
        let size = gainsMatrix.length;
        let minGains = [];

        // get the min gains in every row
        for (let i = 0; i < size; i++) {
            if (i === tokenRowIndex) {
                // avoid the row of the token
                continue;
            }
            let minGain = null;
            for (let j = 0; j < size; j++) {
                if (j === tokenColIndex) {
                    // avoid the column of the token
                    continue;
                }
                if (minGain === null || minGain > gainsMatrix[i][j]) {
                    minGain = gainsMatrix[i][j];
                }
            }

            minGains.push({
                gain: minGain,
                rowIndex: i,
                isRowReadyToEndGame: rowsReadinessToEndGame[i][0],
                isRowAvailable: rowsReadinessToEndGame[i][1],
                availableColumns: boardMatrix[i]
                    .map((value, colIndex) =>
                        value > 0 && colIndex !== tokenColIndex ? colIndex : -1
                    )
                    .filter((value) => value >= 0),
            });
        }

        // sort by gain descending
        return minGains.sort((a, b) => {
            // sort descending by gain
            return b.gain - a.gain;
        });
    },
    /**
     * Get the available cells per column in a board matrix,
     * avoiding the row and column of the token.
     *
     * In the following matrix, the token is located in the position `[3, 3]`
     * ```
     * |  2   3   4  -1  -1 |
     * |  1  -1   3   5   6 |
     * | -1   7  -1   4   1 |
     * |  5  -1   9   0   2 |
     * |  8   7   9   2   1 |
     * ```
     *
     * The output will be the following array:
     *
     * ```
     * [
     *   [0,1,4],    // column 0
     *   [0,2,4],    // column 1
     *   [0,1,4],  // column 2
     *   [],       // column 3 (token column)
     *   [1,2,4] // column 4
     * ]
     * ```
     *
     * @param {
     * number} tokenRowIndex - Index of the row where the token is located.
     * @param {number} tokenColIndex - Index of the column where the token is located.
     * @param {array} boardMatrix - 2 dimensional array of numbers representing a square matrix.
     * @returns {array} Array of arrays, each containing the row indices of available cells per column.
     */
    getAvailableCellsPerColumn(tokenRowIndex, tokenColIndex, boardMatrix) {
        let cellsPerColumn = Array.from({ length: boardMatrix.length }, () => []);

        for (let i = 0; i < boardMatrix.length; i++) {
            for (let j = 0; j < boardMatrix.length; j++) {
                if (i === tokenRowIndex) {
                    // avoid the row of the token
                    continue;
                }
                if (boardMatrix[i][j] > 0 && j !== tokenColIndex) {
                    cellsPerColumn[j].push(i);
                }
            }
        }

        return cellsPerColumn;
    },

    /**
     * Generate a random integer between two limits.
     * @param {number} min
     * @param {number} max
     * @returns {number} Random number.
     */
    randomInteger(min, max) {
        let r = Math.random();
        return min + Math.round(r * (max - min));
    },
    /**
     * Update the elements of an existing object from
     * a valid JSON string. The elements are updated as long as
     * they have the same type.
     * @param {object} object
     * @param {string} jsonString
     */
    updateObjectFromJsonString(object, jsonString) {
        const literal = JSON.parse(jsonString);
        self.updateObjectFromLiteral(object, literal);
    },
    /**
     * Update the elements of an existing object from
     * a literal. The elements are updated as long as
     * they have the same type.
     * @param {object} object
     * @param {object} literal
     */
    updateObjectFromLiteral(object, literal) {
        if (literal === undefined) {
            throw new Error('Undefined object');
        }

        for (const key of Object.keys(literal)) {
            if (
                object.hasOwnProperty(key) &&
                object[key].constructor.name === literal[key].constructor.name
            ) {
                object[key] = literal[key];
            }
        }
    },
    /**
     * Convert a vector into a square array.
     * @param {array} vector - 1 dimentional array of numbers
     * @throws {Error} **vector** is empty, or its size is not the square of an integer.
     * @returns {array} 2 dimentional array of numbers representing a square matrix.
     */
    vectorToMatrix(vector) {
        const size = Math.sqrt(vector.length);
        if (size > 0 && Number.isInteger(size)) {
            let matrix = [];
            for (let i = 0; i < size; i++) {
                let row = [];
                for (let j = 0; j < size; j++) {
                    row.push(vector[size * i + j]);
                }
                matrix.push(row);
            }
            return matrix;
        } else {
            throw new Error('Invalid vector size');
        }
    },
    /**
     * Generate a random number between 0 and 100.
     * @returns {number} Random number between 0 and 100.
     */
    generateRandomNumber() {
        return Math.round(Math.random() * 100);
    },
});
