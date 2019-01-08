const rotateClockwise = (matrix) => {
    let size = matrix.length;
    let newMatrix = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(matrix[size - j - 1][i])
        }
        newMatrix.push(row);
    }

    return newMatrix;
};

const rotateCounterClockwise = (matrix) => {
    let size = matrix.length;
    let newMatrix = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push(matrix[j][size - i - 1])
        }
        newMatrix.push(row);
    }

    return newMatrix;
};

const rotateIndicesClockwise = (rowIndex, colIndex, size) => {
    if (size <= 0) {
        throw new Error("Size of matrix has to be greater than 0");
    }

    if (rowIndex >= size || colIndex >= size) {
        throw new Error("Indices has to be less than size of matrix");
    }

    return [colIndex, size - rowIndex - 1];
};

const rotateIndicesCounterClockwise = (rowIndex, colIndex, size) => {
    if (size <= 0) {
        throw new Error("Size of matrix has to be greater than 0");
    }

    if (rowIndex >= size || colIndex >= size) {
        throw new Error("Indices has to be less than size of matrix");
    }

    return [size - colIndex - 1, rowIndex];
};

const getGainsMatrix = (tokenColIndex, gameMatrix) => {
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
};

const getBestGain = (tokenRowIndex, tokenColIndex, gainsMatrix, boardMatrix) => {
    // assume the direction is vertical
    let size = gainsMatrix.length;
    let minGains = [];

    // get the min gains in every row
    for (let i = 0; i < size; i++) {
        let minGain = null;
        for (let j = 0; j < size; j++) {
            if (j === tokenColIndex) { // avoid the column of the token
                continue;
            }
            if (minGain === null || minGain > gainsMatrix[i][j]) {
                minGain = gainsMatrix[i][j];
            }
        }
        minGains.push(minGain);
    }

    // obtain the index of the max gain
    let rowIndex = -1;
    let maxGain = null;
    for (let i = 0; i < size; i++) {
        // The token has to move to other position: tokenRowIndex !== i
        // Also, a cell has to be in the position: boardMatrix[i][tokenColIndex] > 0
        if ((maxGain === null || maxGain < minGains[i]) &&
            tokenRowIndex !== i &&
            boardMatrix[i][tokenColIndex] > 0) {
            maxGain = minGains[i];
            rowIndex = i;
        }
    }

    return rowIndex;
};

const randomInteger = (min, max) => {
    let r = Math.random();
    return min + Math.round(r * (max - min));
};

const updateObjectFromJsonString = (object, jsonString) => {
    const literal = JSON.parse(jsonString);
    updateObjectFromLiteral(object, literal);
};

const updateObjectFromLiteral = (object, literal) => {
    if (literal === undefined) {
        throw new Error("Undefined object");
    }

    for (const key of Object.keys(literal)) {
        if (object.hasOwnProperty(key) &&
            object[key].constructor.name === literal[key].constructor.name) {
            object[key] = literal[key];
        }
    }
};

const vectorToMatrix = (vector) => {
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
        throw new Error("Invalid vector size");
    }
};

/**
 * Utility functions for the logic's game.
 * @module utils
 */
module.exports = {
    /**
     * Rotates a square matrix clockwisely.
     * @param {array} matrix - Square matrix.
     * @returns {array} Rotated matrix.
     */
    rotateClockwise,

    /**
     * Rotates a square matrix counter-clockwisely.
     * @param {array} matrix - Square matrix.
     * @returns {array} Rotated matrix.
     */
    rotateCounterClockwise,

    /**
     * Rotates row and column indices of an element in a square matrix clockwisely.
     * @param {number} rowIndex
     * @param {number} colIndex
     * @param {number} size - Size of the square matrix.
     * @returns {array} Rotated indices.
     */
    rotateIndicesClockwise,

    /**
     * Rotates row and column indices of an element in a square matrix counter-clockwisely.
     * @param {number} rowIndex
     * @param {number} colIndex
     * @param {number} size - Size of the square matrix.
     * @returns {array} Rotated indices.
     */
    rotateIndicesCounterClockwise,

    /**
     * Gets the horizontal gains of a matrix given a column.
     * The gains are calculated by subtracting the values of each column
     * in the matrix from the column which index is passed as argument.
     * @param {number} tokenColIndex - Index of the column.
     * @param {array} gameMatrix - Matrix of the game.
     * @returns {array} Matrix of gains.
     * @example
     * In the following matrix, the token is located in the position (3, 3)
     *
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     *
     * The output will be the following matrix:
     *
     * | 5  4  3  0 -1 |
     * | 4  0  2  0 -1 |
     * | 2 -3 -2  0  3 |
     * | 0  0  0  0  0 |
     * |-6 -5 -7  0  1 |
     *
     * Notice how the elements in the row and column of the token are set to 0.
     * Also, the positions where the value is less than 0 are set to 0 as well
     * e.g. position (1, 1).
     */

    getGainsMatrix,
    /**
     * Assuming a vertical direction, it gets the indices of the element
     * in the game matrix which gain is the highest.
     * @param {number} tokenRowIndex
     * @param {number} tokenColIndex
     * @param {array} gainsMatrix
     * @param {array} boardMatrix
     * @returns {array} Position of the element with the highest gain.
     * @example
     * Given the following game and gain matrices:
     *
     * | 2  3  4  7  8 |    | 5  4  3  0 -1 |
     * | 1 -1  3  5  5 |    | 4  0  2  0  0 |
     * | 2  7  6  4  1 |    | 2 -3 -2  0  3 |
     * | 5  2  9  0  2 |    | 0  0  0  0  0 |
     * | 8  7  9  2  1 |    |-6 -5 -7  0  1 |
     *
     * Where the token is at position (3, 3). The objective is to
     * select the element in the same column of the token, which value
     * gives the overall best gain. For each row, the best gain is the
     * element with the lowest value, except the element in the same
     * column of the token:
     *
     * row 0, lowest value: -1, column: 4
     * row 1, lowest value:  0, column: 4
     * row 2, lowest value: -3, column: 1
     * row 3, this is the column of the token, it is not considered.
     * row 4, lowest value: -7, column: 2
     *
     * Notice in row 2, the lowest values are at columns 1 and 4.
     * Generally, the lowest column is selected. But in this case,
     * the value at (1, 1) in the game matrix is less than 0. Thus,
     * that element is not considered.
     *
     * The resulting lowest values are
     * row 0: -1
     * row 1:  0
     * row 2: -3
     * row 3: Not considered, the token is here.
     * row 4: -7
     *
     * The chosen value is the highest one: 0. Therefore, the row of that
     * value is selected: row 1.
     * In case, there are more than one highest value, the first one
     * is selected.
     *
     * The output will be the selected row and the column of the token:
     * row 1, column 3.
     *
     */
    getBestGain,

    /**
     * Generates a random integer between two limits.
     * @param {number} min
     * @param {number} max
     * @returns {number} Random number.
     */
    randomInteger,

    /**
     * Updates the elements of an existing object from
     * a valid JSON string. The elements are updated as long as
     * they have the same type.
     * @param {object} object
     * @param {string} jsonString
     */
    updateObjectFromJsonString,

    /**
     * Updates the elements of an existing object from
     * a literal object. The elements are updated as long as
     * they have the same type.
     * @param {object} object
     * @param {object} literal
     */
    updateObjectFromLiteral,

    /**
     * Converts a vector into a square array.
     * @param {array} vector
     * @throws {Error} vector cannot be converted to square matrix.
     * @returns {array} Square matrix.
     */
    vectorToMatrix
};