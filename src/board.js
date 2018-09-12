class Game {
	constructor(boardSize) {
		this.board = new Board(boardSize);
		this.token = new Token(boardSize);
		this.player1 = new Player();
		this.player2 = new Agent();
		this.lastValue = 0;
		this.turn = true; // player 1
		this.started = false;
		this.state = 0; //0: resting, 1: moving token
	}
	moveToken(rowIndex, colIndex) {
		this.token.moveTo(rowIndex, colIndex);
		if(!this.started) {
			let direction;
			if(this.token.oldRowIndex === this.token.rowIndex)
				direction = false;
			else if(this.token.oldColIndex === this.token.colIndex)
				direction = true;

			if(this.turn){
				this.player1.direction = direction;
				this.player2.direction = !direction;
			}
			else {
				this.player2.direction = direction;
				this.player1.direction = !direction;
			}
			this.started = !this.started;
		}
	}
	takeCell() {
		this.lastValue = this.board.takeCurrentValue(this.token);
	}
	updateBoard() {
		this.board.update(this.token);
	}
	updateScores() {
		if(this.turn) {
			this.player1.incrementScore(this.lastValue);
		} else {
			this.player2.incrementScore(this.lastValue);
		}
	}
	passToken() {
		this.turn = !this.turn;
	}
	canContinue() {
		return this.board.isNextTurnPossible(this.turn ? this.player1 : this.player2, this.token);
	}
	getCurrentPlayer() {
		return this.turn ? this.player1 : this.player2;
	}
	getNextPlayer() {
		return this.turn ? this.player2 : this.player1;
	}
}
class Player {
	constructor() {
		this.score = 0;
		this.direction = null; // Direction is set once the game starts
	}
	incrementScore(value) {
		this.score += value;
	}
}
class Agent extends Player{
	constructor(direction) {
		super(direction);
	}
	maxCell(token, board) {
		// direction: true vertical, false horizontal
		// Simply select the cell with the highest value
		let tokenRowIndex = token.rowIndex;
		let tokenColIndex = token.colIndex;
		if(this.direction) {
			let indexMaxValue = -1;
			let maxValue = -1;
			for(let i = 0; i < Board.size; i++) {
				let cell = board.cells[i][tokenColIndex];
				if(cell.value > maxValue) {
					maxValue = cell.value;
					indexMaxValue = i;
				}
			}
			if(maxValue > 0) {
				return [indexMaxValue, tokenColIndex];
			}
		} else {
			let indexMaxValue = -1;
			let maxValue = -1;
			for(let i = 0; i < Board.size; i++) {
				let cell = board.cells[tokenRowIndex][i];
				if(cell.value > maxValue) {
					maxValue = cell.value;
					indexMaxValue = i;
				}
			}
			if(maxValue > 0) {
				return [tokenRowIndex, indexMaxValue];
			}
		}

		return [-1, -1];
	}
}
class Token {
	constructor(boardSize) {
		// random position
		this.rowIndex = randomInteger(0, boardSize - 1);
		this.colIndex = randomInteger(0, boardSize - 1);
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
	// Value is 0 if it is the wildcard
	// Value is -1 if it was taken in a previous turn
	constructor(value, rowIndex, colIndex)
	{
		this.value = value || 0;
		this.rowIndex = rowIndex;
		this.colIndex = colIndex;
	}
	update(value) {
		this.value = value;
	}
	isSelectable() {
		return this.value > 0;
	}
}
class Board {
	constructor(boardSize) {
		this.cells = [];
		for(let i = 0; i < boardSize; i++) {
			let row = [];
			for(let j = 0; j < boardSize; j++) {
				row.push(new Cell(randomInteger(1, 9), i, j));
			}
			this.cells.push(row);
		}
	}
	isCellSelectable(rowIndex, colIndex) {
		return this.cells[rowIndex][colIndex].isSelectable();
	}
	update(token) {
		// The old position has to be set to -1
		this.cells[token.oldRowIndex][token.oldColIndex].update(-1);
		// The current position has to be set to 0
		this.cells[token.rowIndex][token.colIndex].update(0);
	}
	takeCurrentValue(token) {
		return this.cells[token.rowIndex][token.colIndex].value;
	}
	isNextTurnPossible(player, token) {
		let tokenRowIndex = token.rowIndex;
		let tokenColIndex = token.colIndex;
		let direction = player.direction;
		if(direction) {
			for(let i = 0; i < Board.size; i++) {
				let cell = this.cells[i][tokenColIndex];
				if(cell.value > 0) return true;
			}
		} else {
			for(let i = 0; i < Board.size; i++) {
				let cell = this.cells[tokenRowIndex][i];
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