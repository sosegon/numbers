const { updateObjectFromLiteral } = require('./utils.js');

class Cell {
    // Value is a number between 1 and 9 when the cell
    // has not been taken by a player yet
    // Value is 0 if it is the wildcard
    // Value is -1 if it was taken in a previous turn
    constructor(value, rowIndex, colIndex) {
        this.value = value || 0;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
    }
    update = (value) => {
        this.value = value;
    };
    isSelectable = () => {
        return this.value > 0;
    };
    updateFromObject = (token) => {
        updateObjectFromLiteral(this, token);
    };
}

module.exports = {
    Cell
};