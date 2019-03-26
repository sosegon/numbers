/**
 * Utility functions for the logic's game.
 * @module utils
 */
const self = module.exports = {
    /**
     * Rotate a square matrix clockwisely.
     *
     * The following matrix:
     *
     * <pre><code>
     * | 1  2  3 |
     * | 4  5  6 |
     * | 7  8  9 |
     * </code></pre>
     *
     * It is converted to the next one:
     *
     * <pre><code>
     * | 7  4  1 |
     * | 8  5  2 |
     * | 9  6  3 |
     * </code></pre>
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
                row.push(matrix[size - j - 1][i])
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
     * <pre><code>
     * | 1  2  3 |
     * | 4  5  6 |
     * | 7  8  9 |
     * </code></pre>
     *
     * It is converted to the next one:
     *
     * <pre><code>
     * | 3  6  9 |
     * | 2  5  8 |
     * | 1  4  7 |
     * </code></pre>
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
                row.push(matrix[j][size - i - 1])
            }
            newMatrix.push(row);
        }

        return newMatrix;
    },
    /**
     * Rotate row and column indices of an element in a square matrix clockwisely.
     *
     * In the following 5x5 matrix, take the element located at position <code>[3, 3]</code>
     *
     * <pre><code>
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * </code></pre>
     *
     * The matrix rotated clockwisely will be the next one:
     *
     * <pre><code>
     * | 8  5  2  1  2 |
     * | 7  2  7 -1  3 |
     * | 9  9  6  3  4 |
     * | 2  0  4  5  7 |
     * | 1  2  1  6  8 |
     * </code></pre>
     *
     * Then, the output will be <code>[3, 1]</code>
     *
     * @param {number} rowIndex
     * @param {number} colIndex
     * @param {number} size - Size of the square matrix.
     * @returns {array} Array with two numbers defining the rotated row and column indices.
     */
    rotateIndicesClockwise(rowIndex, colIndex, size) {
        if (size <= 0) {
            throw new Error("Size of matrix has to be greater than 0");
        }

        if (rowIndex >= size || colIndex >= size) {
            throw new Error("Indices has to be less than size of matrix");
        }

        return [colIndex, size - rowIndex - 1];
    },
    /**
     * Rotate row and column indices of an element in a square matrix counter-clockwisely.
     *
     * In the following 5x5 matrix, take the element located at position <code>[3, 3]</code>
     *
     * <pre><code>
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * </code></pre>
     *
     * The matrix rotated clockwisely will be the next one:
     *
     * <pre><code>
     * | 8  6  1  2  1 |
     * | 7  5  4  0  2 |
     * | 4  3  6  9  9 |
     * | 3 -1  7  2  7 |
     * | 2  1  2  5  8 |
     * </code></pre>
     *
     * Then, the output will be <code>[1, 3]</code>
     *
     * @param {number} rowIndex
     * @param {number} colIndex
     * @param {number} size - Size of the square matrix.
     * @returns {array} Array with two numbers defining the rotated row and column indices.
     */
    rotateIndicesCounterClockwise(rowIndex, colIndex, size) {
        if (size <= 0) {
            throw new Error("Size of matrix has to be greater than 0");
        }

        if (rowIndex >= size || colIndex >= size) {
            throw new Error("Indices has to be less than size of matrix");
        }

        return [size - colIndex - 1, rowIndex];
    },
    /**
     * Get the horizontal gains of a matrix given a column.
     * The gains are calculated by subtracting the values of each column
     * in the matrix from the column which index is passed as argument.
     *
     * In the following matrix, the token is located in the position <code>[3, 3]</code>
     *
     * <pre><code>
     * | 2  3  4  7  8 |
     * | 1 -1  3  5  6 |
     * | 2  7  6  4  1 |
     * | 5  2  9  0  2 |
     * | 8  7  9  2  1 |
     * </pre></code>
     *
     * The output will be the following matrix:
     *
     * <pre><code>
     * | 5  4  3  0 -1 |
     * | 4  0  2  0 -1 |
     * | 2 -3 -2  0  3 |
     * | 0  0  0  0  0 |
     * |-6 -5 -7  0  1 |
     * </pre></code>
     *
     * Notice how the elements in the row and column of the token are set to <code>0</code>.
     * Also, the positions where the value is less than <code>0</code> are set to <code>0</code> as well
     * e.g. position <code>[1, 1]</code>.
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
     * <pre><code>
     * | 2  3  4  7  8 |    | 5  4  3  0 -1 |
     * | 1 -1  3  5  5 |    | 4  0  2  0  0 |
     * | 2  7  6  4  1 |    | 2 -3 -2  0  3 |
     * | 5  2  9  0  2 |    | 0  0  0  0  0 |
     * | 8  7  9  2  1 |    |-6 -5 -7  0  1 |
     * </pre></code>
     *
     * Where the token is at position <code>[3, 3]</code>. The objective is to
     * select the element in the same column of the token, which value
     * gives the overall best gain. For each row, the best gain is the
     * element with the lowest value, except the element in the same
     * column of the token:
     *
     * <pre><code>
     * row: 0, lowest value: -1, column: 4
     * row: 1, lowest value:  0, column: 4
     * row: 2, lowest value: -3, column: 1
     * row: 3, this is the column of the token, it is not considered.
     * row: 4, lowest value: -7, column: 2
     * </pre></code>
     *
     * Notice in row <code>2</code>, the lowest values are at columns <code>1</code>
     * and <code>4</code>.
     * Generally, the lowest column is selected. But in this case,
     * the value at <code>[1, 1]</code> in the game matrix is less than <code>0</code>. Thus,
     * that element is not considered.
     *
     * The resulting lowest values are the following:
     * <pre><code>
     * row 0: -1
     * row 1:  0
     * row 2: -3
     * row 3: Not considered, the token is here.
     * row 4: -7
     * </pre></code>
     *
     * The chosen value is the highest one: <code>0</code>. Therefore, the row of that
     * value is selected: row <code>1</code>.
     * In case, there are more than one highest value, the first one
     * is selected.
     *
     * The output will be the selected row and the column of the token:
     * row <code>1</code>, column <code>3</code>.
     *
     * @param {number} tokenRowIndex
     * @param {number} tokenColIndex
     * @param {array} gainsMatrix - 2 dimensional array of numbers representing a square gains matrix.
     * @param {array} boardMatrix - 2 dimensional array of numbers representing a square board matrix.
     * @returns {array} Array with two numbers defining the row and column of the element
     * with the best gain.
     */
    getBestGain(tokenRowIndex, tokenColIndex, gainsMatrix, boardMatrix) {
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
            throw new Error("Undefined object");
        }

        for (const key of Object.keys(literal)) {
            if (object.hasOwnProperty(key) &&
                object[key].constructor.name === literal[key].constructor.name) {
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
            throw new Error("Invalid vector size");
        }
    },
    /**
     * Generate a random number between 0 and 100.
     * @returns {number} Random number between 0 and 100.
     */
    generateRandomNumber() {
        return Math.round(Math.random()*100);
    }
};