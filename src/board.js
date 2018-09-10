class Cell {
	// Value is a number between 1 and 9 when the cell
	// has not been taken by a player yet
	// Value is 0 if it the wildcard
	// Value is -1 if it was taken in a previous turn
	constructor(value)
{		this.value = value || 0;
	}

	update(value) {
		this.value = value;
	}
}
class Board {
	constructor() {
		this.cells = [];
		for(let i = 0; i < Board.size; i++) {
			let row = [];
			for(let j = 0; j < Board.size; j++) {
				row.push(new Cell(randomInteger(1, 9)));
			}
			this.cells.push(row);
		}
		// randomly position the starting point
		this.wildRowIndex = randomInteger(0, Board.size - 1);
		this.wildColIndex = randomInteger(0, Board.size - 1);
		this.cells[this.wildRowIndex][this.wildColIndex].value = 0;

		// score for the players A is the person
		this.scoreA = 0;
		this.scoreB = 0;
	}
	isCellSelectable(rowIndex, colIndex) {
		return this.cells[rowIndex][colIndex].value > 0;
	}
	selectCell(rowIndex, colIndex, player) {
		this.removeWildCard();
		if(player) {
			this.scoreA += this.cells[rowIndex][colIndex].value;
		} else {
			this.scoreB += this.cells[rowIndex][colIndex].value;
		}
		this.cells[rowIndex][colIndex].value = 0;
	}
	moveWildCard(rowIndex, colIndex) {
		this.cells[this.wildRowIndex][this.wildColIndex].value = -1;
		this.cells[rowIndex][colIndex].value = 0;
		this.wildRowIndex = rowIndex;
		this.wildColIndex = colIndex;
	}
}

Board.size = 8;

function randomInteger(min, max) {
	let r = Math.random();
	return min + Math.round(r * (max - min));
}