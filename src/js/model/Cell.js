const { updateObjectFromLiteral } = require('./utils.js');

/**
 * Class representing a cell. A cell is a positioned element in the
 * {@link Board} that contains a value.
 */
class Cell {
    /**
     * Create a Cell.
     *
     * @param {number} value
     * @param {number} rowIndex
     * @param {number} colIndex
     */
    constructor(value, rowIndex, colIndex) {
        // Value is a number between 1 and 9 when the cell
        // has not been taken by a player yet
        // Value is 0 if it is the wildcard
        // Value is -1 if it was taken in a previous turn
        this.value = value || 0;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
    }
    /**
     * Update the value of cell.
     *
     * @param {number} value
     */
    updateValue(value) {
        this.value = value;
    }
    /**
     * Check if the cell can be selected.
     * A cell is selectable if its value is
     * greater than 0.
     *
     * @returns {boolean}
     */
    isSelectable() {
        return this.value > 0;
    }
    /**
     * Update from literal.
     *
     * @param {object} cell
     */
    updateFromObject(cell) {
        updateObjectFromLiteral(this, cell);
    }
}

module.exports = {
    Cell
};