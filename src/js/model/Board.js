const { Cell } = require('./Cell.js');
const { randomInteger, updateObjectFromLiteral, vectorToMatrix } = require('./utils.js');
const { PLAYER_DIRECTIONS } = require('../model/constants.js');

class Board {
    constructor(boardSize, matrix) {
        if (arguments.length == 2) {
            this.updateFromMatrix(matrix);
            return;
        }

        this.updateFromScratch(boardSize);
    }
    updateFromMatrix = (matrix) => {
        this.cells = [];
        for (const i in matrix) {
            let row = [];
            for (const j in matrix[i]) {
                row.push(new Cell(matrix[i][j], i, j))
            }
            this.cells.push(row);
        }
    };
    updateFromVector = (vector) => {
        try {
            const matrix = vectorToMatrix(vector);
            this.updateFromMatrix(matrix);
        } catch (err) {
            throw err
        }
    };
    updateFromScratch = (boardSize) => {
        this.cells = [];
        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = 0; j < boardSize; j++) {
                row.push(new Cell(randomInteger(1, 9), i, j));
            }
            this.cells.push(row);
        }
    };
    isCellSelectable = (rowIndex, colIndex) => {
        return this.cells[rowIndex][colIndex].isSelectable();
    };
    update = (token) => {
        // The old position has to be set to -1
        this.cells[token.oldRowIndex][token.oldColIndex].update(-1);
        // The current position has to be set to 0
        this.cells[token.rowIndex][token.colIndex].update(0);
    };
    takeCurrentValue = (token) => {
        if (token.rowIndex >= this.cells.length ||
            token.colIndex >= this.cells.length) {
            throw new Error("Invalid token position");
        }
        return this.cells[token.rowIndex][token.colIndex].value;
    };
    isNextTurnPossible = (player, token) => {
        let tokenRowIndex = token.rowIndex;
        let tokenColIndex = token.colIndex;
        if (player.direction === PLAYER_DIRECTIONS.VERTICAL) {
            for (let i = 0; i < this.cells.length; i++) {
                let cell = this.cells[i][tokenColIndex];
                if (cell.value > 0) return true;
            }
        } else if (player.direction === PLAYER_DIRECTIONS.HORIZONTAL) {
            for (let i = 0; i < this.cells.length; i++) {
                let cell = this.cells[tokenRowIndex][i];
                if (cell.value > 0) return true;
            }
        } else {
            throw new Error('Invalid player direction');
        }
        return false;
    };
    setCellValues = (values) => {
        let size = Math.sqrt(values.length);
        this.cells.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                cell.update(values[rowIndex * size + columnIndex]);
            });
        });
    };
    findTokenPosition = () => {
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells.length; j++) {
                if (this.cells[i][j].value === 0) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    };
    serialize = () => {
        let values = []
        this.cells.forEach(row => {
            row.forEach(cell => {
                values.push(cell.value);
            });
        });

        return values;
    };
    asMatrix = () => {
        let size = this.cells.length;
        let matrix = [];
        for (let i = 0; i < size; i++) {
            let row = []
            for (let j = 0; j < size; j++) {
                row.push(this.cells[i][j].value);
            }
            matrix.push(row);
        }
        return matrix;
    };
}

module.exports = {
    Board
};