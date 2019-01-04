const { Cell } = require('./Cell.js');
const { randomInteger } = require('./utils.js');

class Board {
    constructor(boardSize, matrix) {
        if (arguments.length == 2) {
            this.createFromMatrix(matrix);
            return;
        }

        this.createFromScratch(boardSize);
    }
    createFromMatrix = (matrix) => {
        this.cells = [];
        for (const i in matrix) {
            let row = [];
            for (const j in matrix[i]) {
                row.push(new Cell(matrix[i][j], i, j))
            }
            this.cells.push(row);
        }
    };
    createFromScratch = (boardSize) => {
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
        return this.cells[token.rowIndex][token.colIndex].value;
    };
    isNextTurnPossible = (player, token) => {
        let tokenRowIndex = token.rowIndex;
        let tokenColIndex = token.colIndex;
        let direction = player.direction;
        if (direction) {
            for (let i = 0; i < this.cells.length; i++) {
                let cell = this.cells[i][tokenColIndex];
                if (cell.value > 0) return true;
            }
        } else {
            for (let i = 0; i < this.cells.length; i++) {
                let cell = this.cells[tokenRowIndex][i];
                if (cell.value > 0) return true;
            }
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