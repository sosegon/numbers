const { randomInteger, updateObjectFromLiteral } = require('./utils.js');

/**
 * Class representing a token. A token is the element that moves in the
 * {@link Board} to select a {@link Cell}.
 */
class Token {
    /**
     * Create a token. The position of the token is randomly assigned.
     *
     * @param {number} boardSize - The size of the {@link Board}.
     */
    constructor(boardSize) {
        // random position
        this.rowIndex = randomInteger(0, boardSize - 1);
        this.colIndex = randomInteger(0, boardSize - 1);
        this.oldRowIndex = this.rowIndex;
        this.oldColIndex = this.colIndex;
    }
    /**
     * Move the token to a new position.
     *
     * @param {number} rowIndex
     * @param {number} colIndex
     * @throws {Error} Either row index or column index is negative.
     */
    moveTo(rowIndex, colIndex) {
        if (rowIndex < 0 || colIndex < 0) {
            throw new Error("Invalid position");
        }
        this.oldRowIndex = this.rowIndex;
        this.oldColIndex = this.colIndex;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
    }
    /**
     * Set position of token.
     *
     * @param {number} rowIndex
     * @param {number} colIndex
     * @throws {Error} Either row index or column index is negative.
     */
    set(rowIndex, colIndex) {
        if (rowIndex < 0 || colIndex < 0) {
            throw new Error("Invalid position");
        }
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.oldRowIndex = this.rowIndex;
        this.oldColIndex = this.colIndex;
    }
    /**
     * Serialize token.
     *
     * @returns {object} Serialized token.
     */
    serialize() {
        return {
            rowIndex: this.rowIndex,
            colIndex: this.colIndex,
            oldRowIndex: this.oldRowIndex,
            oldColIndex: this.oldColIndex
        };
    }
    /**
     * Convert serialized token to string.
     *
     * @returns {string} Stringified token.
     */
    toString() {
        return JSON.stringify(this.serialize());
    }
    /**
     * Update token from literal.
     *
     * @param {object} token
     */
    updateFromObject(token) {
        updateObjectFromLiteral(this, token);
    }
}

module.exports = {
    Token
};