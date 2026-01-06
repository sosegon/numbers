const { Cell } = require('@model/Cell');
const { randomInteger, vectorToMatrix } = require('@model/utils');
const { PLAYER_DIRECTIONS } = require('@model/flags');
/**
 * Class representing a board. A board has a matrix of {@link Cell}s.
 */
class Board {
    /**
     * Create a board.
     *
     * @param {number} boardSize
     * @param {array} [matrix] - 2 dimensional array of numbers.
     * If this parameter is given, **boardSize** is ignored.
     */
    constructor(boardSize, matrix) {
        if (arguments.length == 2) {
            this.updateFromMatrix(matrix);
            return;
        }

        this.updateFromScratch(boardSize);
    }
    /**
     * Update the board using a matrix with values for the {@link Cell}s.
     *
     * @param {array} matrix - 2 dimensional array of numbers.
     */
    updateFromMatrix(matrix) {
        // TODO: Do something when the matrix is not square.
        this.cells = [];
        for (const i in matrix) {
            let row = [];
            for (const j in matrix[i]) {
                row.push(new Cell(matrix[i][j], i, j));
            }
            this.cells.push(row);
        }
    }
    /**
     * Update the board using a vector with values for the {@link Cell}s.
     *
     * @param {array} vector - 1 dimensional array of numbers.
     * @throws {Error} **vector** is empty, or its size is not the square of an integer.
     */
    updateFromVector(vector) {
        try {
            const matrix = vectorToMatrix(vector);
            this.updateFromMatrix(matrix);
        } catch (err) {
            throw err;
        }
    }
    /**
     * Update the board using a given size. The size determines the dimensions
     * of the board. Each {@link Cell} in the board is created with a random value
     * between 1 and 9.
     *
     * @param {number} boardSize - The size of the square board.
     */
    updateFromScratch(boardSize) {
        // TODO: Make sure boardSize is an integer
        this.cells = [];
        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = 0; j < boardSize; j++) {
                row.push(new Cell(randomInteger(1, 9), i, j));
            }
            this.cells.push(row);
        }
    }
    /**
     * Check if the {@link Cell} in the given position is selectable
     *
     * @param {number} rowIndex
     * @param {number} colIndex
     * @returns {boolean} The {@link Cell} is selectable or not.
     */
    isCellSelectable(rowIndex, colIndex) {
        // TODO: Check rowIndex and colIndex are valid
        return this.cells[rowIndex][colIndex].isSelectable();
    }
    /**
     * Update the value of the {@link Cell}s based on the current
     * and old positions of the {@link Token}. The value of the {@link Cell} in
     * the current position of the {@link Token} is set to <code>0</code>.
     * The value of the {@link Cell} in the old position of the {@link Token}
     * is set to <code>-1</code>.
     *
     * If the current and old position of the {@link Token} is the same,
     * the value of the corresponding {@link Cell} is set to <code>0</code>.
     *
     * @param {Token} token
     */
    updateCellsByToken(token) {
        // The old position has to be set to -1
        this.cells[token.oldRowIndex][token.oldColIndex].updateValue(-1);
        // The current position has to be set to 0
        this.cells[token.rowIndex][token.colIndex].updateValue(0);
    }
    /**
     * Take the value of the {@link Cell} which position is
     * defined by the {@link Token}.
     *
     * @param {Token} token
     * @returns {number} Value of the {@link Cell}.
     * @throws {Error} token has an invalid position
     */
    getValueInCellByToken(token) {
        // TODO: token is invalid if it has negative values in rowIndex or colIndex
        if (token.rowIndex >= this.cells.length || token.colIndex >= this.cells.length) {
            throw new Error('Invalid token position');
        }
        return this.cells[token.rowIndex][token.colIndex].value;
    }
    /**
     * Determine if there is at least one selectable {@link Cell}
     * in the direction of the {@link Player}.
     *
     * @param {Player} player
     * @param {Token} token
     * @returns {boolean} board has at least one selectable {@link Cell} in the direction of
     * the {@link Player}
     */
    canPlayerMakeMove(player, token) {
        let tokenRowIndex = token.rowIndex;
        let tokenColIndex = token.colIndex;
        // TODO: check the position of token.
        if (player.direction === PLAYER_DIRECTIONS.VERTICAL) {
            for (let i = 0; i < this.cells.length; i++) {
                let cell = this.cells[i][tokenColIndex];
                if (cell.isSelectable()) return true;
            }
        } else if (player.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
            for (let i = 0; i < this.cells.length; i++) {
                let cell = this.cells[tokenRowIndex][i];
                if (cell.isSelectable()) return true;
            }
        } else {
            throw new Error('Invalid player direction');
        }
        return false;
    }
    /**
     * Find the position of the token in the board.
     * The position of token corresponds to the position
     * of the {@link Cell} which value is 0.
     *
     * If no {@link Cell} has value 0, then the returned value is
     * <code>[-1, -1]</code>
     *
     * @returns {array} Array with 2 numbers defining the row and column of the {@link Token}.
     */
    findTokenPosition() {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells.length; j++) {
                if (this.cells[i][j].value === 0) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }
    /**
     * Serialize board.
     *
     * @returns {array} 1 dimensional array of numbers corresponding to {@link Cell}s' values.
     */
    serialize() {
        let values = [];
        this.cells.forEach((row) => {
            row.forEach((cell) => {
                values.push(cell.value);
            });
        });

        return values;
    }
    /**
     * Get the matrix of {@link Cell}s' values.
     *
     * @returns {array} 2 dimentional array of numbers corresponding to {@link Cell}s' values.
     */
    asMatrix() {
        let size = this.cells.length;
        let matrix = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            for (let j = 0; j < size; j++) {
                row.push(this.cells[i][j].value);
            }
            matrix.push(row);
        }
        return matrix;
    }
}

module.exports = {
    Board,
};
