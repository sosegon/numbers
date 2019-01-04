const { randomInteger } = require('./utils.js');

class Token {
    constructor(boardSize) {
        // random position
        this.rowIndex = randomInteger(0, boardSize - 1);
        this.colIndex = randomInteger(0, boardSize - 1);
        this.oldRowIndex = this.rowIndex;
        this.oldColIndex = this.colIndex;
    }
    moveTo = (rowIndex, colIndex) => {
        this.oldRowIndex = this.rowIndex;
        this.oldColIndex = this.colIndex;
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
    };
    set(rowIndex, colIndex) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.oldRowIndex = this.rowIndex;
        this.oldColIndex = this.colIndex;
    }
    serialize = () => {
        return {
            rowIndex: this.rowIndex,
            colIndex: this.colIndex,
            oldRowIndex: this.oldRowIndex,
            oldColIndex: this.oldColIndex
        };
    };
    toString = () => {
        return JSON.stringify(this.serialize());
    };
}

module.exports = {
    Token
};