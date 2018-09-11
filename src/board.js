class Agent {
	constructor() {
	}
	play(direction, board) {
		// direction: true vertical, false horizontal
		// Simply select the cell with the highest value
		let wildRowIndex = board.wildCardCell.rowIndex;
		let wildColIndex = board.wildCardCell.colIndex;
		if(direction) {
			let indexMaxValue = -1;
			let maxValue = -1;
			for(let i = 0; i < Board.size; i++) {
				let cell = board.cells[i][wildColIndex];
				if(cell.value > maxValue) {
					maxValue = cell.value;
					indexMaxValue = i;
				}
			}
			if(maxValue > 0) {
				return board.moveWildCard(indexMaxValue, wildColIndex);
			}
		} else {
			let indexMaxValue = -1;
			let maxValue = -1;
			for(let i = 0; i < Board.size; i++) {
				let cell = board.cells[wildRowIndex][i];
				if(cell.value > maxValue) {
					maxValue = cell.value;
					indexMaxValue = i;
				}
			}
			if(maxValue > 0) {
				return board.moveWildCard(wildRowIndex, indexMaxValue);
			}
		}

		return 0;
	}
}
class WildCardCell {
	constructor(rowIndex, colIndex) {
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
		this.oldRowIndex = this.rowIndex;
		this.oldColIndex = this.colIndex;
	}
	moveTo(rowIndex, colIndex) {
		this.oldRowIndex = this.rowIndex;
		this.oldColIndex = this.colIndex;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
	}
}
class Cell {
	// Value is a number between 1 and 9 when the cell
	// has not been taken by a player yet
	// Value is 0 if it the wildcard
	// Value is -1 if it was taken in a previous turn
	constructor(value)
	{
		this.value = value || 0;
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
		let wildRowIndex = randomInteger(0, Board.size - 1);
		let wildColIndex = randomInteger(0, Board.size - 1);
		this.cells[wildRowIndex][wildColIndex].value = 0;
		this.wildCardCell = new WildCardCell(wildRowIndex, wildColIndex);

		this.scoreA = 0; // Person
		this.scoreB = 0; // Agent
		this.agent = new Agent();
		this.agentPlaying = false;
		this.gameEnd = false;
	}
	isCellSelectable(rowIndex, colIndex) {
		return this.cells[rowIndex][colIndex].value > 0;
	}
	moveWildCard(rowIndex, colIndex) {
		let valueToTake = this.cells[rowIndex][colIndex].value;
		let wildRowIndex = this.wildCardCell.rowIndex;
		let wildColIndex = this.wildCardCell.colIndex;
		this.cells[wildRowIndex][wildColIndex].value = -1;
		this.cells[rowIndex][colIndex].value = 0;
		this.wildCardCell.moveTo(rowIndex, colIndex);
		return valueToTake;
	}
	runAgent(direction) {
		return this.agent.play(direction, this);
	}
	canMoveWildCard(direction) {
		let wildRowIndex = this.wildCardCell.rowIndex;
		let wildColIndex = this.wildCardCell.colIndex;
		if(direction) {
			for(let i = 0; i < Board.size; i++) {
				let cell = this.cells[i][wildColIndex];
				if(cell.value > 0) return true;
			}
		} else {
			for(let i = 0; i < Board.size; i++) {
				let cell = this.cells[wildRowIndex][i];
				if(cell.value > 0) return true;
			}
		}
		return false;
	}
}

Board.size = 6;

function randomInteger(min, max) {
	let r = Math.random();
	return min + Math.round(r * (max - min));
}